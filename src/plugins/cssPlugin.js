/*
|-------------------------------------------------------------------------------
| css插件
|-------------------------------------------------------------------------------
|
*/
import Map from '../map';
import { rCssNumVal, isPlainObject } from '../util';

const cssProps = {};
const prefixes = ['', 'webkit', 'Moz', 'O', 'ms'];
const html = document.documentElement;

const validTransforms = arrayToObject(['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX',
    'rotateY', 'rotateZ','scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective']);

const optionalUnitProperties = arrayToObject(['columnCount', 'fillOpacity', 'fontSizeAdjust', 'fontWeight',
    'lineHeight', 'opacity', 'orphans', 'widows', 'zIndex', 'zoom', 'rotate', 'rotateX', 'rotateY', 'rotateZ',
    'scale', 'scaleX', 'scaleY', 'scaleZ', 'order', 'flexGrow', 'flexShrink', 'scrollLeft', 'scrollTop',
    'strokeDashoffset', 'strokeDasharray']);

const cssTypeWhitelist = arrayToObject(['opacity']);

function arrayToObject( array, val ) {
    let map = {},
        i, l;
    
    val = val === void 0 ? 1 : val;
    for ( i = 0, l = array.length; i < l; i++ ) {
        map[ array[i] ] = val;
    }
    return map;
}

function isElement( target ) {
    return target && target.nodeType === 1;
}

// 连字符、小驼峰 -> 大驼峰
function pascalCase( target ) {
    return target.replace( /[-]([^-])/g, ( m, g1 ) => g1.toUpperCase())
                 .replace(/^./, m => m.toUpperCase());
}

// 连字符、大驼峰 -> 小驼峰
function camalCase( target ) {
    return target.replace( /[-]([^-])/g, ( m, g1 ) => g1.toUpperCase())
                 .replace(/^./, m => m.toLowerCase());
}

const cssHooks = {
    _default: {
        get( elem, prop ) {
            return getStyle( elem, prop );
        },
        set( elem, prop, val ) {
            setStyle( elem, prop, val );
        }
    }
};

['scrollTop', 'scrollLeft'].forEach(item => {
    cssHooks[ item ] = {
        get( elem, prop ) {
            return elem[ prop ];
        },
        set( elem, prop, value ) {
            elem[ prop ] = value;
        }
    };
});

function getStyle( elem, prop ) {
    return ( window.getComputedStyle ? window.getComputedStyle( elem ) : elem.currentStyle )[ getPrefixedCssProp( prop ) ];
}

function setStyle( elem, prop, val ) {
    elem.style[ getPrefixedCssProp( prop ) ] = typeof val === 'number' && !optionalUnitProperties[prop] ? val + 'px' : val;
}

function setStyleIgnoreUnit( elem, prop, val ) {
    elem.style[ getPrefixedCssProp( prop ) ] = val;
}

function css( elem, prop, value ) {
    if ( !elem || !prop ) {
        return;
    }
    if ( isPlainObject( prop ) ) {
        for ( i in prop ) {
            css( elem, i, prop[i] );
        }
        return;
    }
    if ( value === void 0 ) {
        return ( cssHooks[prop] && cssHooks[prop].get || cssHooks._default.get )( elem, prop );
    }
    ( cssHooks[prop] && cssHooks[prop].set || cssHooks._default.set )( elem, prop, value );
}

function getPrefixedCssProp( name, host ) {
    let i, l,
        prefix,
        fitName;

    if ( cssProps[ name ] ) {
        return cssProps[ name ];
    }

    host = host || html.style;

    for ( i = 0, l = prefixes.length; i < l; i++ ) {
        prefix = prefixes[ i ];
        fitName = prefix ? prefix + pascalCase( name ) : camalCase( name );
        if ( fitName in host ) {
            return ( cssProps[ name ] = fitName );
        }
    }
    return null;
}

function getDefaultUnit( prop ) {
    if ( /rotate|skew/.test( prop ) ) {
        return 'deg';
    }
    if ( optionalUnitProperties[prop] ) {
        return '';
    }
    return 'px';
}


function getTransforms( target ) {
    let str,
        reg,
        m,
        transforms;

    if ( !isElement( target ) ) {
        return;
    }

    transforms = new Map();  // 确保有序性
    str = target.style[ getPrefixedCssProp('transform') ] || '';
    reg = /(\w+)\(([^)]+)\)/g;

    while ( ( m = reg.exec( str ) ) ) {
        transforms.set( m[1], m[2] );
    }
    return transforms;
}

function parseUnit( value ) {
    return rCssNumVal.test( value ) ? RegExp.$3 : '';
}

function convertPxToUnit( target, value, unit ) {
    let tempEl,
        parentEl,
        baseline = 100,
        factor;

    if ( [parseUnit( value ), 'deg', 'rad', 'turn'].indexOf( unit ) !== -1 ) {
        return value;
    }

    tempEl = document.createElement( target.tagName );
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    parentEl = target.parentNode && target.parentNode !== document ? target.parentNode : document.body;
    parentEl.appendChild( tempEl );
    factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild( tempEl );
    return factor * parseFloat( value );
}

function getCSSOriginalValue( target, prop, unit ) {
    let value = getStyle( target, prop );
    return unit ? convertPxToUnit( target, value, unit ) : value;
}

function getTransformOriginalValue( target, prop, unit ) {
    let value = getTransforms( target ).get( prop ) ||
            (/scale/.test(prop) ? 1 : 0 + getDefaultUnit( prop ));

    return unit ? convertPxToUnit( target, value, unit ) : value;
}

function getOriginalValue( target, prop, unit, isTransform ) {
    return ( isTransform ? getTransformOriginalValue : getCSSOriginalValue )( target, prop, unit );
}

function isTransform( prop ) {
    return !!validTransforms[ prop ];
}

export default {
    id: 'css',
    priority: 90,
    install( vivid ) {
        vivid.css = css;
        vivid.getPrefixedCssProp = getPrefixedCssProp;
    },
    init( tween ) {
        let data = tween.pluginData,
            cssData,
            target = tween.animatable.target,
            property = tween.property;

        if ( !isElement( target ) || !getPrefixedCssProp( property ) && !isTransform( property ) ) {
            return;
        }

        cssData = data.css = {};

        if ( isTransform( property ) ) {
            cssData.isTransform = true;
            if ( !tween.animatable.transforms ) {
                tween.animatable.transforms = {
                    map: getTransforms( target )
                };
            }
        }

        if ( tween.from == null ) {
            tween.from = getOriginalValue( target, property, tween.unit, cssData.isTransform );
            if ( rCssNumVal.test( tween.from ) ) {
                tween.from = parseFloat( RegExp.$2 );
            }
        }

        if ( !tween.unit ) {
            tween.unit = getDefaultUnit( property );
        }
    },
    update( tween, value, TERMINATE ) {
        let cssData = tween.pluginData.css,
            property;

        if ( !cssData ) {
            return;
        }

        if ( Array.isArray( value ) ) {
            value = value[0];
        }
        value += tween.unit;

        property = tween.property;
        if ( cssData.isTransform ) {
            let map = tween.animatable.transforms.map;

            map.set( property, value );

            value = '';
            map.forEach(( val, key ) => value += key + '(' + val + ') ');
            property = 'transform';
        }
        setStyleIgnoreUnit( tween.animatable.target, property, value );

        return TERMINATE;
    }
};