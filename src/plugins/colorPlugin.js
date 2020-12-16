/*
|-------------------------------------------------------------------------------
| color插件
|-------------------------------------------------------------------------------
|
*/
import namedColor from './namedColor';

function hexToRgb( hex ) {
    let r = /[0-9a-f]{2}/ig, rgb = [];
    while ( r.test( hex ) ) {
        rgb.push( parseInt( RegExp.lastMatch, 16 ) );
    }
    return rgb;
}

function pickNumToArray( str ) {
    let r = /[.\d]+/g, rgb = [];
    while ( r.test( str ) ) {
        rgb.push( Number( RegExp.lastMatch ) );
    }
    return rgb;
}

function hslToRgb( h, s, l ) {
    let r, g, b;

    function hue2rgb( p, q, t ) {
        if ( t < 0 ) t += 1;
        if ( t > 1 ) t -= 1;
        if ( t < 1 / 6 ) return p + (q - p) * 6 * t;
        if ( t < 1 / 2 ) return q;
        if ( t < 2 / 3 ) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if ( s == 0 ) {
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

// 1. 3位或6位十六进制hex
// 2. rgb
// 3. rgba
// 4. hsl
// 5. hsla
// 6. 颜色名
function colorToRgba( val ) {
    let rgba, arr;

    if ( /^#?[0-9a-f]{3}$/i.test( val ) ) {
        rgba = hexToRgb( val.replace(/(.)(.)(.)$/, '$1$1$2$2$3$3') );
    } else if ( /^#?([0-9a-f]{6})$/i.test( val ) ) {
        rgba = hexToRgb( RegExp.$1 );
    } else if ( /^rgb/i.test( val ) ) {
        rgba = pickNumToArray( val );
    } else if ( /^hsl/i.test( val ) ) {
        arr = pickNumToArray( val );
        arr[0] /= 360;
        arr[1] /= 100;
        arr[2] /= 100;
        rgba = hslToRgb.apply(null, arr).concat( arr[3] );
    } else if ( namedColor.hasOwnProperty( (val = String(val).toLowerCase()) ) ) {
        rgba = hexToRgb( namedColor[val] );
    } else {
        rgba = [0,0,0,1];
    }

    if ( typeof rgba[3] !== 'number' ) {
        rgba[3] = 1;
    }

    return rgba;
}

function rgbToHex( r, g, b ) {
    function hex( num ) {
        let str = num.toString(16);
        return str.length === 1 ? '0' + str : str;
    }
    return '#' + hex(r) + hex(g) + hex(b);
}

function isColor( value ) {
    return namedColor.hasOwnProperty( String(value).toLowerCase() ) ||
        /^(?:rgb|hsl|#(?:[0-9a-f]{6}|[0-9a-f]{3})$)/i.test( value );
}


export default {
    id: 'color',
    init: function( tween, prevTween ) {
        let data = tween.pluginData,
            from, to,
            pair = tween.between[0];

        if ( typeof pair.to !== "string" || !isColor( pair.to ) ) {
            return;
        }

        from = colorToRgba( pair.from );
        to = colorToRgba( pair.to );

        tween.between = to.map(function( value, i ) {
            return {
                from: from[i],
                to: value,
                round: i === 3 ? 0 : 1
            };
        });
        tween.unit = '';
        data.color = {};
    },
    update: function( progress, tween, value ) {
        let i, l,
            colorData = tween.pluginData.color;

        if ( !colorData ) {
            return;
        }

        return 'rgba(' + value.join(',') + ')';
    }
};