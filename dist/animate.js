/**
 * @version v0.3.0
 * @link https://github.com/sutras/animate#readme
 * @license MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animate = factory());
}(this, (function () { 'use strict';

    var namedColor = {
        black: '000000',
        silver: 'c0c0c0',
        gray: '808080',
        white: 'ffffff',
        maroon: '800000',
        red: 'ff0000',
        purple: '800080',
        fuchsia: 'ff00ff',
        green: '008000',
        lime: '00ff00',
        olive: '808000',
        yellow: 'ffff00',
        navy: '000080',
        blue: '0000ff',
        teal: '008080',
        aqua: '00ffff',
        orange: 'ffa500',
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        blanchedalmond: 'ffebcd',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkgrey: 'a9a9a9',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkslategrey: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dimgrey: '696969',
        dodgerblue: '1e90ff',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        greenyellow: 'adff2f',
        grey: '808080',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgray: 'd3d3d3',
        lightgreen: '90ee90',
        lightgrey: 'd3d3d3',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslategray: '778899',
        lightslategrey: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370db',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        oldlace: 'fdf5e6',
        olivedrab: '6b8e23',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'db7093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        slategrey: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        wheat: 'f5deb3',
        whitesmoke: 'f5f5f5',
        yellowgreen: '9acd32',
        rebeccapurple: '663399'
    };

    var easingStrategies$1 = {
        def: 'easeInOutQuad',
        linear:  function (k) {  //无缓动效果
            return k;
        },
        easeInQuad: function(k) {
            return k * k;
        },
        easeOutQuad: function(k) {
            return k * (2 - k);
        },
        easeInOutQuad: function(k) {
            if ((k *= 2) < 1) { return 0.5 * k * k; }
            return - 0.5 * (--k * (k - 2) - 1);
        },
        easeInCubic: function(k) {
            return k * k * k;
        },
        easeOutCubic: function(k) {
            return --k * k * k + 1;
        },
        easeInOutCubic: function(k) {
            if ((k *= 2) < 1) { return 0.5 * k * k * k; }
            return 0.5 * ((k -= 2) * k * k + 2);
        },
        easeInQuart: function(k) {
            return k * k * k * k;
        },
        easeOutQuart: function(k) {
            return 1 - (--k * k * k * k);
        },
        easeInOutQuart: function(k) {
            if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
            return - 0.5 * ((k -= 2) * k * k * k - 2);
        },
        easeInQuint: function(k) {
            return k * k * k * k * k;
        },
        easeOutQuint: function(k) {
            return --k * k * k * k * k + 1;
        },
        easeInOutQuint: function(k) {
            if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k; }
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        },
        easeInSine: function(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        easeOutSine: function(k) {
            return Math.sin(k * Math.PI / 2);
        },
        easeInOutSine: function(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        },
        easeInExpo: function(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        easeOutExpo: function(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
        },
        easeInOutExpo: function(k) {
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            if ((k *= 2) < 1) { return 0.5 * Math.pow(1024, k - 1); }
            return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
        },
        easeInCirc: function(k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        easeOutCirc: function(k) {
            return Math.sqrt(1 - (--k * k));
        },
        easeInOutCirc: function(k) {
            if ((k *= 2) < 1) { return - 0.5 * (Math.sqrt(1 - k * k) - 1); }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        },
        easeInElastic: function(k) {
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },
        easeOutElastic: function(k) {
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },
        easeInOutElastic: function(k) {
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            k *= 2;
            if (k < 1) { return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI); }
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        },
        easeInBack: function(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        easeOutBack: function(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        easeInOutBack: function(k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) { return 0.5 * (k * k * ((s + 1) * k - s)); }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        },
        easeInBounce: function(k) {
            return 1 - easingStrategies.easeOutBounce(1 - k);
        },
        easeOutBounce: function(k) {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        },
        easeInOutBounce: function(k) {
            if (k < 0.5) { return easingStrategies.easeInBounce(k * 2) * 0.5; }
            return easingStrategies.easeOutBounce(k * 2 - 1) * 0.5 + 0.5;
        }
    };

    /*
    |-------------------------------------------------------------------------------
    | 全局内部变量
    |-------------------------------------------------------------------------------
    |
    */
    var toString = Object.prototype.toString;

    var rNumSrc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var unit = '%|px|em|ex|ch|rem|vw|vh|vmin|vmax|pc|pt|in|cm|mm|deg|rad|turn';
    var rCssNumVal = new RegExp('^([+\\-*%]=|)(' + rNumSrc + ')(' + unit + '|)$', 'i');
    var rNums = new RegExp(rNumSrc, 'g');

    var cssProps = {};
    var prefixes = ['', 'webkit', 'Moz', 'O', 'ms'];
    var html = document.documentElement;

    var validTransforms = arrayToObject(['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX',
        'rotateY', 'rotateZ','scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective']);

    var optionalUnitProperties = arrayToObject(['columnCount', 'fillOpacity', 'fontSizeAdjust', 'fontWeight',
        'lineHeight', 'opacity', 'orphans', 'widows', 'zIndex', 'zoom', 'rotate', 'rotateX', 'rotateY', 'rotateZ',
        'scale', 'scaleX', 'scaleY', 'scaleZ', 'order', 'flexGrow', 'flexShrink', 'scrollLeft', 'scrollTop',
        'strokeDashoffset', 'strokeDasharray']);

    var cssTypeWhitelist = arrayToObject(['opacity']);

    var PROP_TYPE_CSS = 0;
    var PROP_TYPE_TRANSFORM = 1;
    var PROP_TYPE_OBJECT = 2;
    var PROP_TYPE_ATTRIBUTE = 3;

    var VALUE_TYPE_NORMAL = 0;
    var VALUE_TYPE_COLOR = 1;
    var VALUE_TYPE_GEOMETRY = 2;

    var DIRECTION_ALTERNATE_REVERSE = 'alternate-reverse';
    var DIRECTION_REVERSE = 'reverse';
    var DIRECTION_ALTERNATE = 'alternate';



    /*
    |-------------------------------------------------------------------------------
    | 工具函数
    |-------------------------------------------------------------------------------
    |
    */

    // 通用
    // ====

    // 连字符、小驼峰 -> 大驼峰
    function pascalCase( target ) {
        return target.replace( /[-]([^-])/g, function( m, g1 ) {
            return g1.toUpperCase();
        }).replace(/^./, function( m ) {
            return m.toUpperCase();
        });
    }

    // 连字符、大驼峰 -> 小驼峰
    function camalCase( target ) {
        return target.replace( /[-]([^-])/g, function( m, g1 ) {
            return g1.toUpperCase();
        }).replace(/^./, function( m ) {
            return m.toLowerCase();
        });
    }

    function assignObjectProp( target ) {
        var arguments$1 = arguments;

        var i = 1,
            j,
            l = arguments.length,
            options;

        for ( ; i < l; i++ ) {
            options = arguments$1[i];
            for ( j in options ) {
                target[j] = options[j];
            }
        }
        return target;
    }

    function copyObject( target ) {
        var i, obj = {};
        for ( i in target ) {
            obj[i] = target[i];
        }
        return obj;
    }

    function overrideObject( target ) {
        var arguments$1 = arguments;

        var i = 1,
            j,
            l = arguments.length,
            options;

        for ( ; i < l; i++ ) {
            options = arguments$1[i];

            for ( j in target ) {
                if ( options && options.hasOwnProperty( j ) ) {
                    target[j] = options[j];
                }
            }
        }
        return target;
    }

    function assignObject( target ) {
        var arguments$1 = arguments;

        var i = 1,
            j,
            l = arguments.length,
            options;

        for ( ; i < l; i++ ) {
            options = arguments$1[i];

            for ( j in options ) {
                target[j] = options[j];
            }
        }
        return target;
    }

    function isFunction( target ) {
        return typeof target === 'function';
    }

    function isPlainObject( target ) {
        return toString.call( target ) === '[object Object]';
    }

    function isEmptyObject( target ) {
        var i;
        for ( i in target ) {
            break;
        }

        return isUndefined( i );
    }

    function isArray( target ) {
        if ( Array.isArray ) {
            return Array.isArray( target );
        }
        return toString.call( target ) === '[object Array]';
    }

    function isArrayLike( target ) {
        return target != null &&
            typeof target === 'object' &&
            isFinite( target.length ) &&
            target.length >= 0 &&
            target.length === Math.floor( target.length ) &&
            target.length < 4294967296;
    }

    function isElement( target ) {
        return target && target.nodeType === 1;
    }

    function isUndefined( target ) {
        return target === void 0;
    }

    function isSvg( target ) {
        return typeof SVGElement !== 'undefined' && target instanceof SVGElement;
    }

    function indexOf( array, item ) {
        if ( array.indexOf ) {
            return array.indexOf( item );
        }
        for ( var i = 0, l = array.length; i < l; i++ ) {
            if ( array[i] === item ) {
                return i;
            }
        }
        return -1;
    }

    // 判断数组是否包含指定元素
    function inArray( array, item ) {
        return indexOf( array, item ) !== -1;
    }

    // 扁平化数组
    function flattenArray( target, depth ) {
        var result = [],
            i, l, item;
        
        depth = depth || 1;

        for ( i = 0, l = target.length; i < l; i++ ) {
            item = target[i];
            result = result.concat( isArray(item) && depth > 1 ? flattenArray( item, depth - 1 ) : item );
        }

        return result;
    }

    // 数组去重
    function uniqueArray( target ) {
        var result = [],
            i, l, item;

        for ( i = 0, l = target.length; i < l; i++ ) {
            item = target[i];
            if ( indexOf( target, item ) === i ) {
                result.push( item );
            }
        }
        return result;
    }

    function arrayToObject( array, val ) {
        var map = {},
            i, l;
        
        val = isUndefined( val ) ? 1 : val;
        for ( i = 0, l = array.length; i < l; i++ ) {
            map[ array[i] ] = val;
        }
        return map;
    }

    function arrayEach( array, callback ) {
        for ( var i = 0, l = array.length; i < l; i++ ) {
            callback( array[i], i, l );
        }
    }

    // 数组映射
    function arrayMap( array, callback ) {
        var i = 0,
            l = array.length,
            arr = [];

        for ( ; i < l; i++ ) {
            arr.push( callback( array[i], i, array ) );
        }
        return arr;
    }

    function arrayPluck( target, key ) {
        var result = [], prop, i = 0, l = target.length;

        for ( ; i < l; i++ ) {
            prop = target[ i ][ key ];
            if ( prop != null ) {
                result.push( prop );
            }
        }

        return result;
    }

    function sortBy( target, fn, scope ) {
        var array = arrayMap( target, function( item, index ) {
            return {
                el: item,
                ret: fn.call( scope, item, index )
            };
        }).sort(function( left, right ) {
            var a = left.ret, b = right.ret;
            // 字符串不能相减，但可以比较大小，显式返回大于0、小于0、0等于就可以满足sort函数的要求
            return a < b ? -1 : a > b ? 1 : 0;
        });
        return arrayPluck( array, 'el' );
    }

    function strIncludes( str, text ) {
        return str.indexOf( text ) !== -1;
    }

    function random( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) + min );
    }

    var Map = window.Map && window.Map.prototype.forEach ? window.Map : (function() {
        return /*@__PURE__*/(function () {
            function anonymous() {
                this.keys = [];
                this.values = [];
                this.size = 0;
            }

            anonymous.prototype.set = function set ( key, value ) {
                var i;

                if ( ( i = indexOf( this.keys, key ) ) === -1 ) {
                    this.keys.push( key );
                    this.size = this.keys.length;
                    return this.values.push( value );
                }
                this.values[i] = value;
            };

            anonymous.prototype.get = function get ( key ) {
                return this.values[ indexOf( this.keys, key ) ];
            };

            anonymous.prototype.has = function has ( key ) {
                return inArray( this.keys, key );
            };

            anonymous.prototype.forEach = function forEach ( fn ) {
                for ( var i = 0; i < this.size; i++ ) {
                    fn( this.values[i], this.keys[i], this );
                }
            };

            anonymous.prototype['delete'] = function ( key ) {
                var i;
                if ( ( i = indexOf( this.keys, key ) ) !== -1 ) {
                    this.keys.splice(i, 1);
                    this.values.splice(i, 1);
                    this.size = this.keys.length;
                    return true;
                }
                return false;
            };

            return anonymous;
        }())
    })();

    var Set = window.Set && window.Set.prototype.forEach ? window.Set : (function() {
        return /*@__PURE__*/(function () {
            function anonymous( arr ) {
                this.values = [];
                this.size = 0;

                if ( isArray( arr ) ) {
                    this.values = arr.slice();
                    this.size = arr.length;
                } else if ( arr instanceof Set ) {
                    this.values = arr.values.slice();
                    this.size = arr.size;
                }
            }

            anonymous.prototype.add = function add ( value ) {
                if ( indexOf( this.values, value ) === -1 ) {
                    this.values.push( value );
                    this.size++;
                }
                return this;
            };

            anonymous.prototype.has = function has ( value ) {
                return inArray( this.values, value );
            };

            anonymous.prototype.forEach = function forEach ( fn ) {
                for ( var i = 0; i < this.size; i++ ) {
                    fn( this.values[i], this.values[i], this );
                }
            };

            anonymous.prototype['delete'] = function ( value ) {
                var i;
                if ( ( i = indexOf( this.values, value ) ) !== -1 ) {
                    this.values.splice(i, 1);
                    this.size--;
                    return true;
                }
                return false;
            };

            return anonymous;
        }())
    })();


    // 样式
    // ====

    var cssHooks = {
        _default: {
            get: function( elem, prop ) {
                return getStyle( elem, prop );
            },
            set: function( elem, prop, val ) {
                setStyle( elem, prop, val );
            }
        },
        opacity: {
            get: function( elem, prop ) {
                if ( 'opacity' in document.body.style ) {
                    return getStyle( elem, prop );
                }
                return ( (getStyle( elem, 'filter' ).match(/[.\d]+/) || [])[0] || 100 ) / 100;
            },
            set: function( elem, prop, val ) {
                if ( 'opacity' in document.body.style ) {
                    setStyle( elem, prop, val );
                } else {
                    elem.style.filter = 'alpha(opacity="' + val * 100 + '")';
                }
            }
        }
    };

    function getStyle( elem, prop ) {
        return ( window.getComputedStyle ? window.getComputedStyle( elem ) : elem.currentStyle )[ getCssProp( prop ) ];
    }

    function setStyle( elem, prop, val ) {
        elem.style[ getCssProp( prop ) ] = val;
    }

    function css( elem, prop, value ) {
        if ( isUndefined( value ) ) {
            return ( cssHooks[prop] && cssHooks[prop].get || cssHooks._default.get )( elem, prop );
        } else {
            ( cssHooks[prop] && cssHooks[prop].set || cssHooks._default.set )( elem, prop, value );
        }
    }

    function getCssProp( name, host ) {
        var i, l,
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



    // 颜色
    // ====

    function hexToRgb( hex ) {
        var r = /[0-9a-f]{2}/ig, rgb = [];
        while ( r.test( hex ) ) {
            rgb.push( parseInt( RegExp.lastMatch, 16 ) );
        }
        return rgb;
    }

    function pickNumToArray( str ) {
        var r = /[.\d]+/g, rgb = [];
        while ( r.test( str ) ) {
            rgb.push( Number( RegExp.lastMatch ) );
        }
        return rgb;
    }

    function hslToRgb( h, s, l ) {
        var r, g, b;

        function hue2rgb( p, q, t ) {
            if ( t < 0 ) { t += 1; }
            if ( t > 1 ) { t -= 1; }
            if ( t < 1 / 6 ) { return p + (q - p) * 6 * t; }
            if ( t < 1 / 2 ) { return q; }
            if ( t < 2 / 3 ) { return p + (q - p) * (2/3 - t) * 6; }
            return p;
        }

        if ( s == 0 ) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
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
        var rgba, arr;

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
            var str = num.toString(16);
            return str.length === 1 ? '0' + str : str;
        }
        return '#' + hex(r) + hex(g) + hex(b);
    }

    function isColor( value ) {
        return namedColor.hasOwnProperty( String(value).toLowerCase() ) ||
            /^(?:rgb|hsl|#(?:[0-9a-f]{6}|[0-9a-f]{3})$)/i.test( value );
    }


    // 其他
    // ====

    function parseTargets( target ) {
        var result = [],
            i, l, item;

        if ( !isArray( target ) ) {
            target = [target];
        }
        target = flattenArray( target );
        for ( i = 0, l = target.length; i < l; i++ ) {
            item = target[i];
            if ( item ) {
                if ( isElement( item ) ) {
                    result.push( item );
                } else if ( typeof item === 'string' &&
                        document.querySelectorAll &&
                        ( item = document.querySelectorAll( item ) ) ||
                        isArrayLike( item ) ) {

                    result.push.apply( result, item );
                }
            }
        }
        return uniqueArray( result );
    }
    function getEasing( ease ) {
        return isFunction( ease ) ? ease : easingStrategies$1[ ease ] || easingStrategies$1[ easingStrategies$1.def ];
    }

    function decomposeValue( value ) {
        return rCssNumVal.exec( value );
    }

    function isTransform( prop ) {
        return !!validTransforms[ prop ];
    }

    function getTargetPropType( target, prop ) {
        if ( isElement( target ) ) {
            if ( isTransform( prop ) ) {
                return PROP_TYPE_TRANSFORM;
            }
            if ( cssTypeWhitelist[prop] || getCssProp(prop, target.style) ) {
                return PROP_TYPE_CSS;
            }
            if ( isSvg( target ) && target[prop] ) {
                return PROP_TYPE_ATTRIBUTE;
            }
        }
        return PROP_TYPE_OBJECT;
    }

    // 一个值（可选单位）
    // 颜色值
    // 对象： {
    //      路径动画
    //      其他
    // }
    function getValueType( value ) {
        if ( isColor( value ) ) {
            return VALUE_TYPE_COLOR;
        }
        if ( isPlainObject( value ) && isParticular( value.type ) ) {
            return value.type.type;
        }
        return VALUE_TYPE_NORMAL;
    }

    function getTransforms( target ) {
        var str,
            reg,
            m,
            transforms;

        if ( !isElement( target ) ) {
            return;
        }

        transforms = new Map();  // 确保有序性
        str = target.style[ getCssProp('transform') ] || '';
        reg = /(\w+)\(([^)]+)\)/g;

        while ( ( m = reg.exec( str ) ) ) {
            transforms.set( m[1], m[2] );
        }
        return transforms;
    }

    function getDefaultUnit( prop, propType ) {
        if ( strIncludes( prop, 'rotate' ) || strIncludes( prop, 'skew' ) ) {
            return 'deg';
        }
        if ( optionalUnitProperties[prop] || propType === PROP_TYPE_OBJECT || propType === PROP_TYPE_ATTRIBUTE ) {
            return '';
        }
        return 'px';
    }

    function parseUnit( value ) {
        return rCssNumVal.test( value ) ? RegExp.$3 : '';
    }

    function getTransformValue( target, prop, unit ) {
        var value = getTransforms( target ).get( prop ) ||
                (/scale/.test(prop) ? 1 : 0 + getDefaultUnit( prop, PROP_TYPE_TRANSFORM ));

        return unit ? convertPxToUnit( target, value, unit ) : value;
    }

    function convertPxToUnit( target, value, unit ) {
        var tempEl,
            parentEl,
            baseline = 100,
            factor;

        if ( inArray( [parseUnit( value ), 'deg', 'rad', 'turn'], unit ) ) {
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

    function getRelativeValue( from, to, operator ) {
        if ( !operator ) {
            return to;
        }
        switch ( operator[0] ) {
            case '+': return from + to;
            case '-': return from - to;
            case '*': return from * to;
            case '/': return from / to;
        }
    }

    function getCSSValue( target, prop, unit ) {
        var value = css( target, prop );
        return unit ? convertPxToUnit( target, value, unit ) : value;
    }

    function getOriginalValue( target, prop, unit, propType ) {
        switch ( propType ) {
            case PROP_TYPE_TRANSFORM:
                return getTransformValue( target, prop, unit );
            case PROP_TYPE_CSS:
                return getCSSValue( target, prop, unit );
            case PROP_TYPE_ATTRIBUTE:
                return getAttribute( target, prop );
            default:
                return target[ prop ] || 0;
        }
    }

    function isReverse( direction ) {
        return direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE;
    }

    function isAlternate( direction ) {
        return direction === DIRECTION_ALTERNATE || direction === DIRECTION_ALTERNATE_REVERSE;
    }

    function getAttribute( elem, attr ) {
        return elem.getAttribute( attr );
    }

    function setAttribute( elem, attr, val ) {
        return elem.setAttribute( attr, val );
    }

    function getFunctionValue( value, animatable ) {
        return isFunction( value ) ? value( animatable.target, animatable.id, animatable.total ) : value;
    }

    function ValueType( type ) {
        this.type = type;
    }

    function particular( type ) {
        return new ValueType( type );
    }

    function isParticular( obj ) {
        return obj instanceof ValueType;
    }



    /*
    |-------------------------------------------------------------------------------
    | svg：路径动画、划线动画
    |-------------------------------------------------------------------------------
    |
    */

    function getDistance( p1, p2 ) {
        return Math.sqrt( Math.pow( p1.x - p2.x, 2 ) + Math.pow( p1.y - p2.y, 2 ) );
    }

    function getBaseVal( elem, prop ) {
        return elem[ prop ].baseVal.value;
    }

    function getRadianByLine( p1, p2 ) {
        return Math.atan2( p2.y - p1.y, p2.x - p1.x );
    }

    function getAngleByLine( p1, p2 ) {
        return getRadianByLine( p1, p2 ) / Math.PI * 180;
    }

    function getPointAtLine( p1, p2, progress ) {
        var radian = getRadianByLine( p1, p2 ),
            x = Math.cos( radian ) * progress,
            y = Math.sin( radian ) * progress;

        return {
            x: p1.x + x,
            y: p1.y + y
        };
    }



    function getRectTotalLength( elem ) {
        return getBaseVal( elem, 'width' ) * 2 + getBaseVal( elem, 'height' ) * 2;
    }

    function getCircleTotalLength( elem ) {
        return getBaseVal( elem, 'r' ) * 2 * Math.PI;
    }

    // 此公式来源于：百度百科椭圆周长第十条公式（该公式发明人周钰承）
    // 通过多次计算得出，此公式获取的周长与chrome浏览器内置的公式获取的周长有一个像素左右的误差。
    function getEllipseTotalLength( elem ) {
        var rx = getBaseVal( elem, 'rx' ),
            ry = getBaseVal( elem, 'ry' ),
            a = Math.max( rx, ry ),
            b = Math.min( rx, ry ),
            c = ( a - b ) / ( a + b ),
            pi = Math.PI,
            pow = Math.pow;

        return pi * ( a + b ) *
            (   1 +
                3 * c * c / ( 10 + Math.sqrt( 4 - 3 * c * c ) ) +
                ( 4 / pi - 14 / 11 ) * pow( c, 14.233 + 13.981 * pow( c, 6.42 ) )
            );
    }

    function getLineTotalLength( elem ) {
        return getDistance({
            x: getBaseVal( elem, 'x1' ),
            y: getBaseVal( elem, 'y1' )
        }, {
            x: getBaseVal( elem, 'x2' ),
            y: getBaseVal( elem, 'y2' )
        });
    }

    function getPolylineTotalLength( elem ) {
        var points = elem.points,
            i, totalLength = 0;

        for ( i = 1; i < points.numberOfItems; i++ ) {
            totalLength += getDistance( points.getItem(i - 1), points.getItem(i) );
        }
        return totalLength;
    }

    function getPolygonTotalLength( elem ) {
        var points = elem.points;
        return getPolylineTotalLength( elem ) +
            getDistance( points.getItem(0), points.getItem( points.numberOfItems - 1 ) );
    }

    function getTotalLength( elem ) {
        if ( elem.getTotalLength ) {
            return elem.getTotalLength();
        }
        switch ( elem.nodeName.toLowerCase() ) {
            case 'rect':
                return getRectTotalLength( elem );
            case 'circle':
                return getCircleTotalLength( elem );
            case 'ellipse':
                return getEllipseTotalLength( elem );
            case 'line':
                return getLineTotalLength( elem );
            case 'polyline':
                return getPolylineTotalLength( elem );
            case 'polygon':
                return getPolygonTotalLength( elem );
        }
    }

    function getPointAtLengthByCircle( elem, length ) {
        var radius = getBaseVal( elem, 'r' ),
            cx = getBaseVal( elem, 'cx' ),
            cy = getBaseVal( elem, 'cy' ),
            radian = length / getTotalLength( elem ) * 2 * Math.PI,
            ly = Math.sin( radian ) * radius,
            lx = Math.cos( radian ) * radius;

        return {
            x: cx + lx,
            y: cy + ly
        };
    }

    // 待实现
    function getPointAtLengthByEllipse( elem, length ) {
        var totalLength = getTotalLength( elem ),
            rx = getBaseVal( elem, 'rx' ),
            ry = getBaseVal( elem, 'ry' ),
            cx = getBaseVal( elem, 'cx' ),
            cy = getBaseVal( elem, 'cy' ),
            radian = 2 * Math.PI * ( length / totalLength );

        return {
            x: rx * Math.cos( radian ) + cx,
            y: ry * Math.sin( radian ) + cy
        };
    }

    function getPointAtLengthByRect( elem, length ) {
        var x = getBaseVal( elem, 'x' ),
            y = getBaseVal( elem, 'y' ),
            width = getBaseVal( elem, 'width' ),
            height = getBaseVal( elem, 'height' ),
            arr = [ width, height, width, height ],
            section, i = 0, prev = 0, sum = 0;

        for ( ; i < 4; i++ ) {
            sum += arr[i];

            if ( sum >= length ) {
                section = length - prev;
                switch ( i ) {
                    case 0:
                        x += section;
                        break;
                    case 1:
                        x += width;
                        y += section;
                        break;
                    case 2:
                        x += width - section;
                        y += height;
                        break;
                    case 3:
                        y += height - section;

                }

                return {
                    x: x,
                    y: y
                };
            }
            prev = sum;
        }
    }

    function getPointAtLengthByLine( elem, length ) {
        return getPointAtLine( {
            x: getBaseVal( elem, 'x1' ),
            y: getBaseVal( elem, 'y1' )
        }, {
            x: getBaseVal( elem, 'x2' ),
            y: getBaseVal( elem, 'y2' )
        }, length );
    }

    function getPointAtLengthByPolyline( elem, length, polygon ) {
        var points = elem.points,
            l = points.numberOfItems + ( polygon || 0 ),
            prev = 0, sum = 0, p1, p2, i, j;

        for ( i = 1; i < l; i++ ) {
            j = i - 1;
            if ( polygon && i === l - 1 ) {
                i = 0;
                j = l - 2;
            }
            p1 = points.getItem(j);
            p2 = points.getItem(i);
            sum += getDistance( p1, p2 );
            if ( sum >= length ) {
                return getPointAtLine( p1, p2, length - prev );
            }
            prev = sum;
        }
    }

    function getPointAtLengthByPolygon( elem, length ) {
        return getPointAtLengthByPolyline( elem, length, 1 );
    }

    function getPointAtLength( elem, length ) {
        if ( elem.getPointAtLength ) {
            return elem.getPointAtLength( length );
        }
        switch ( elem.nodeName.toLowerCase() ) {
            case 'rect':
                return getPointAtLengthByRect( elem, length );
            case 'circle':
                return getPointAtLengthByCircle( elem, length );
            case 'ellipse':
                return getPointAtLengthByEllipse( elem, length );
            case 'line':
                return getPointAtLengthByLine( elem, length );
            case 'polyline':
                return getPointAtLengthByPolyline( elem, length );
            case 'polygon':
                return getPointAtLengthByPolygon( elem, length );
        }
    }

    function getGeometry( elem, percent ) {
        elem = typeof elem === 'string' ? document.querySelector( elem ) : elem;
        percent = percent || 100;

        return function( property ) {
            return {
                el: elem,
                property: property,
                totalLength: getTotalLength( elem ) * ( percent / 100 ),
                type: particular( VALUE_TYPE_GEOMETRY )
            };
        };
    }

    function setDashoffset( elem ) {
        var length = getTotalLength( elem );
        setAttribute( elem, 'stroke-dasharray', length );
        return length;
    }



    /*
    |-------------------------------------------------------------------------------
    | 交错动画
    |-------------------------------------------------------------------------------
    |
    */

    var staggerOptions = {
        start: 0,
        from: 0,
        direction: 'normal',
        easing: null,
        grid: null
    };

    function stagger( val, options ) {
        options = assignObjectProp( {}, staggerOptions, options );

        var direction = options.direction,
            tween = options.easing ? easingStrategies$1[ options.easing ] : null,
            grid = options.grid,
            axis = options.axis,
            fromIndex = options.from || 0,
            fromFirst = fromIndex === 'first',
            fromCenter = fromIndex === 'center',
            fromLast = fromIndex === 'last',
            isRange = isArray( val ),
            val1 = isRange ? parseFloat( val[0] ) : parseFloat( val ),
            val2 = isRange ? parseFloat( val[1] ) : 0,
            unit = 0,
            start = options.start || 0 + ( isRange ? val1 : 0 ),
            values = [],
            maxValue = 0;

        return function( elem, index, total ) {
            var i, fromX, fromY,
                toX, toY,
                distanceX, distanceY,
                value,
                spacing;

            fromIndex = fromFirst ? 0 : fromCenter ? ( total - 1 ) / 2 : fromLast ? total - 1 : fromIndex;

            if ( !values.length ) {
                for ( i = 0; i < total; i++ ) {
                    if ( !grid ) {
                        values.push( Math.abs( fromIndex - i ) );
                    } else {
                        fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
                        fromY = !fromCenter ? Math.floor( fromIndex / grid[0] ) : ( grid[1] - 1 ) / 2;
                        toX = i % grid[0];
                        toY = Math.floor( i / grid[0] );
                        distanceX = fromX - toX;
                        distanceY = fromY - toY;
                        value = Math.sqrt( distanceX * distanceX + distanceY * distanceY );

                        value = axis === 'x' ? -distanceX : axis === 'y' ? -distanceY : value;

                        values.push( value );
                    }
                    maxValue = Math.max.apply( null, values );
                }

                if ( tween ) {
                    values = arrayMap( values, function( val ) {
                        return tween( val / maxValue ) * maxValue;
                    } );
                }

                if ( direction === 'reverse' ) {
                    values = arrayMap( values, function( val ) {
                        return axis ? -val : Math.abs( maxValue - val );
                    } );
                }
            }

            spacing = isRange ? ( val2 - val1 ) / maxValue : val1;
            return start + ( spacing * ( Math.round( values[index] * 100 ) / 100 ) ) + unit;
        };
    }


    /*
    |-------------------------------------------------------------------------------
    | requestAnimationFrame
    |-------------------------------------------------------------------------------
    |
    | 改编自司徒正美《javascript框架设计》
    |
    */
    function getAnimationFrame() {
        // IE10、chrome24
        if ( window.requestAnimationFrame ) {
            return {
                request: requestAnimationFrame,
                cancel: cancelAnimationFrame
            };
        }

        // Firefox11没有实现 cancelRequestAnimiationFrame
        // 并且 mozRequestAnimationFrame 与标准出入过大
        if ( window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame ) {
            return {
                request: mozRequestAnimationFrame,
                cancel: mozCancelAnimationFrame
            };
        }

        // 某个webkit版本没有返回id值，因此要用setInterval实现
        if ( window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String) ) {
            return {
                // 修正某个特异的webkit版本下没有time参数（意义不大，而且这个time并不是页面打开到如今的毫秒数）
                request: function( callback ) {
                    return window.webkitRequestAnimationFrame(function() {
                        return callback( new Date() - 0 );
                    });
                },
                cancel: window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame
            };
        }

        var millisec = 1000 / 60,
            callbacks = [],
            id = 1,
            cursor = 0,
            timer;

        function playAll() {
            var i, cloned, callback;

            timer = null;
            cloned = callbacks.slice();
            cursor += callbacks.length;
            callbacks.length = 0;  // 清空队列
            for ( i = 0; ( callback = cloned[i++] ); ) {
                if ( callback !== 'cancelled' ) {
                    callback( new Date() - 0 );
                }
            }
        }

        return {
            request: function( handler ) {
                callbacks.push( handler );
                if ( !timer ) {
                    timer = window.setTimeout( playAll, millisec );
                }
                return id++;
            },
            cancel: function( id ) {
                callbacks[id - cursor] = 'cancelled';
            }
        };
    }

    var animationFrameController = getAnimationFrame();
    var request = animationFrameController.request;
    var cancel = animationFrameController.cancel;

    /*
    |-------------------------------------------------------------------------------
    | 引擎
    |-------------------------------------------------------------------------------
    |
    | 使用requestAnimationFrame或定时器驱动集合里面的时间轴运行调用。
    | 引擎对外暴露了add和remove两个方法用来向引擎添加或删除时间轴。
    |
    */
    var engine = (function() {
        var timelines = new Set(),
            id = null,
            paused = true;

        function add( tick ) {
            timelines.add( tick );
            run();
        }

        function remove( tick ) {
            timelines['delete']( tick );
        }

        function step() {
            if ( timelines.size === 0 ) {
                stop();
            } else {
                new Set( timelines ).forEach(function( tick ) {
                    tick();
                });

                id = request( step );
            }
        }

        function run() {
            if ( paused ) {
                paused = false;
                id = request( step );
            }
        }

        function stop() {
            if ( !paused ) {
                paused = true;
                cancel( id );
            }
        }

        return {
            add: add,
            remove: remove
        };
    })();




    /*
    |-------------------------------------------------------------------------------
    | 时间轴
    |-------------------------------------------------------------------------------
    |
    | 每一次调用对外接口返回的就是一个时间轴对象，用于对时间进行控制；
    | 例如播放、暂停、跳转到指定时间、跳转到最后、重新播放等。
    |
    */

    function getAnimatables( targets ) {
        return arrayMap( targets, function( target, i ) {
            return {
                target: target,
                id: i,
                total: targets.length,
                transforms: {
                    inited: false
                }
            };
        });
    }

    function structureValue( value ) {
        if ( isPlainObject( value ) && !isParticular( value.type ) ) {
            value = [ value ];
        } else if ( !isArray( value ) || !isPlainObject( value[0] ) ) {
            value = [{ value: value }];
        }

        return value;
    }

    function normalizeTweens( animatable, tweenConfigs, property, options, beginTime, animationProperties, averageDuration ) {
        var duration = isUndefined( averageDuration ) ? options.duration : averageDuration,
            l = tweenConfigs.length,
            tweens,
            endTime = beginTime || 0,
            propType = getTargetPropType( animatable.target, property ),
            prevTween;

        averageDuration = duration / l;

        if ( isTransform( property ) && !animatable.transforms.inited ) {
            animatable.transforms.map = getTransforms( animatable.target );
        }

        function normalizeTween( tweenConfig, index, prevTween ) {
            var duration = getFunctionValue( isUndefined( tweenConfig.duration ) ? averageDuration : tweenConfig.duration, animatable ),
                delay = getFunctionValue( isUndefined( tweenConfig.delay ) ? index === 0 ? options.delay : 0 : tweenConfig.delay, animatable ),
                endDelay = getFunctionValue( isUndefined( tweenConfig.endDelay ) ? index === l - 1 ? options.endDelay : 0 : tweenConfig.endDelay, animatable ),
                total = delay + duration + endDelay,
                begin = endTime,
                end = begin + total,
                to, from, tween,
                valueStrategy,
                values;

            endTime += total;

            to = tweenConfig.value;
            if ( !isPlainObject( to ) ) {
                if ( isArray( to ) ) {
                    from = to[0];
                    to = to[1];
                } else {
                    from = 'auto';
                }
            }

            tween = {
                animatable: animatable,
                property: property,
                duration: duration,
                delay: delay,
                endDelay: endDelay,
                round: tweenConfig.round || options.round,
                value: tweenConfig.value,
                begin: begin,
                end: end,
                from: getFunctionValue( from, animatable ),
                to: getFunctionValue( to, animatable ),
                easing: getEasing( tweenConfig.easing || options.easing ),
                propType: propType,
                valueType: getValueType( to === 'auto' ? from : to )
            };

            valueStrategy = valueStrategies.get( tween.valueType );

            if ( !prevTween ) {
                prevTween = animationProperties && !isEmptyObject( animationProperties ) && 
                    ( values = animationProperties[ property ] ) ? values[ values.length - 1 ] : null;
            }

            assignObject( tween, valueStrategy.init( tween, prevTween ) );

            tween.get = valueStrategy.get;
            return tween;
        }

        tweens = sortBy( arrayMap(tweenConfigs, function( tweenConfig, index ) {
            prevTween = normalizeTween( tweenConfig, index, prevTween );
            return prevTween;
        }), function( item ) {
            return item.begin;
        });

        return {
            endTime: endTime,
            tweens: tweens
        };
    }

    function getOneKeyframeSetting( animatable, keyframe, options, beginTime, animationProperties, averageDuration ) {
        var props = {}, p;

        for ( p in keyframe ) {
            props[p] = normalizeTweens(
                animatable,
                structureValue( keyframe[p] ),
                p,
                options, 
                beginTime,
                animationProperties,
                averageDuration
            );
        }

        return props;
    }

    function getKeyframesAnimationProperties( animatable, keyframes, options ) {
        var oneKeyframeSetting,
            animationProperties = {},
            endTime = 0,
            averageDuration = options.duration / keyframes.length;

        arrayEach( keyframes, function( keyframe ) {
            var p;

            oneKeyframeSetting = getOneKeyframeSetting( animatable, keyframe, options, endTime, animationProperties, averageDuration );

            for ( p in oneKeyframeSetting ) {
                endTime = Math.max( endTime, oneKeyframeSetting[p].endTime );
                animationProperties[p] = ( animationProperties[p] || [] ).concat( oneKeyframeSetting[p].tweens );
            }
        });

        return animationProperties;
    }

    function flattenKeyframesAnimationProperties( animationPropertiesGroup ) {
        var animationProperties = animationPropertiesGroup[0],
            i, l = animationPropertiesGroup.length,
            p, anotherAnimationProperties;

        for ( i = 1; i < l; i++ ) {
            anotherAnimationProperties = animationPropertiesGroup[i];
            for ( p in anotherAnimationProperties ) {
                animationProperties[p] = ( animationProperties[p] || [] ).concat( anotherAnimationProperties[p] );
            }
        }
        return animationProperties;
    }

    function getAllAnimationProperties( animatable, properties, keyframes, options ) {
        return flattenKeyframesAnimationProperties( arrayMap( [ keyframes, [ properties ] ], function( keyframes ) {
            return getKeyframesAnimationProperties( animatable, keyframes, options );
        }) );
    }

    function getAnimations( animatables, properties, keyframes, options ) {
        return flattenArray( arrayMap( animatables, function( animatable ) {
            var animationProperties = getAllAnimationProperties( animatable, properties || {}, keyframes || [], options ),
                p, animations = [];

            for ( p in animationProperties ) {
                animations.push( createAnimation( animationProperties[p] ) );
            }

            return animations;
        }) );
    }

    function getAnimationsDuration( animations ) {
        return Math.max.apply( null, arrayMap(animations, function( animation ) {
            return Math.max.apply( null, arrayMap( animation.tweens, function( tween ) {
                return tween.end;
            }) );
        }) );
    }

    var defaultTimelineSettings = {
        autoplay: true,
        delegate: false,
        loop: 0,
        direction: 'normal',  // normal, reverse, alternate, alternate-reverse
        
        begin: null,
        complete: null,
        loopBegin: null,
        loopComplete: null,
        pause: null,
        play: null,
        update: null
    };

    var defaultTweenSettings = {
        duration: 400,
        delay: 0,
        endDelay: 0,
        easing: easingStrategies$1.def,
        round: 0
    };

    function createTimeline( configuration ) {
        var timelineOptions, tweenOptions,
            targets, autoplay, delegate, loopAmount, loopCount, reversed,
            animatables, animations,
            isPlaying = false,
            started = false,
            duration = 0,
            startTime = 0,
            currDuration = 0;

        timelineOptions = overrideObject( copyObject( defaultTimelineSettings ), configuration );
        tweenOptions = overrideObject( copyObject( defaultTweenSettings ), configuration );
        targets = parseTargets( configuration.targets );
        autoplay = timelineOptions.autoplay;
        delegate = timelineOptions.delegate;
        loopAmount = timelineOptions.loop === true ? Infinity : timelineOptions.loop || 1;
        loopCount = loopAmount;
        reversed = isReverse( timelineOptions.direction );

        animatables = getAnimatables( targets );
        animations = getAnimations( animatables, configuration.properties, configuration.keyframes, tweenOptions );
        duration = getAnimationsDuration( animations );

        if ( autoplay ) {
            start();
        }

        function invokeCallback( name ) {
            if ( isFunction( timelineOptions[name] ) ) {
                timelineOptions[name]();
            }
        }

        function start() {
            if ( !started ) {
                started = true;
                invokeCallback('begin');
            } else {
                currDuration = 0;
            }
            invokeCallback('loopBegin');
            play();
        }

        function restart() {
            pause();
            currDuration = 0;
            started = false;
            loopCount = loopAmount;
            reversed = isReverse( timelineOptions.direction );
            play();
        }

        function play() {
            // 第一次start
            if ( !started ) {
                return start();
            }
            if ( isPlaying ) {
                return;
            }
            isPlaying = true;
            startTime = new Date();
            if ( !delegate ) {
                engine.add( tick );
            }
            invokeCallback('play');
        }

        function pause() {
            if ( !isPlaying ) {
                return;
            }
            isPlaying = false;
            if ( !delegate ) {
                engine.remove( tick );
            }
            invokeCallback('pause');
        }

        function reverse() {
            reversed = !reversed;
        }

        function seek( progress ) {
            var finished,
                i = 0,
                l = animations.length;

            if ( progress >= duration ) {
                progress = duration;
                finished = true;
            }
            currDuration = progress || 0;

            for ( ; i < l; i++ ) {
                animations[i].update( reversed ? duration - progress : progress );
            }

            invokeCallback('update');

            if ( finished ) {
                pause();

                if ( isAlternate( timelineOptions.direction ) ) {
                    reverse();
                }

                invokeCallback('loopComplete');

                if ( --loopCount < 0 ) {
                    loopCount = 0;
                }

                if ( loopCount === 0 ) {
                    invokeCallback('complete');
                } else {
                    start();
                }
            }
        }

        function tick() {
            if ( isPlaying ) {
                var currTime = new Date();
                // currTime - startTime：两次tick的时间间隔
                // startTime：默认添加到引擎的时间，之后为上一次tick的时间
                seek( currTime - startTime + currDuration );
                startTime = currTime;
            }
        }

        function finish() {
            seek( duration );
        }

        return {
            restart: restart,
            play: play,
            pause: pause,
            seek: seek,
            finish: finish,
            tick: function() {
                if ( delegate ) {
                    tick();
                }
            },
            getCurrDuration: function() {
                return currDuration;
            },
            getDuration: function() {
                return duration;
            },
            getProgress: function() {
                return duration === 0 ? 0 : currDuration / duration;
            }
        };
    }


    /*
    |-------------------------------------------------------------------------------
    | 动画
    |-------------------------------------------------------------------------------
    |
    | 返回一个拥有update方法的对象，update功能是接受时间进度来设置target的属性值。
    |
    */

    function getTweenValue( progress, from, to, tween ) {
        var round = tween.round,
            duration = tween.duration,
            delay = tween.delay,
            begin = tween.begin,
            value = progress <= begin + delay ?
                from :
                progress >= begin + delay + duration ?
                    to :
                    from + tween.easing( ( progress - begin - delay ) / duration ) * ( to - from );

        if ( round ) {
            value = Math.round( value * round ) / round;
        }

        return value;
    }

    function setTargetValue( config, value ) {
        var str = '',
            animatable = config.animatable,
            map = animatable.transforms.map,
            target = animatable.target,
            prop = config.property;

        switch ( config.propType ) {
            case PROP_TYPE_CSS:
                return css( target, prop, value);

            case PROP_TYPE_TRANSFORM:
                map.set( prop, value );
                map.forEach(function( val, key ) {
                    str += key + '(' + val + ') ';
                });
                css( target, 'transform', str);
                return;

            case PROP_TYPE_ATTRIBUTE:
                return setAttribute( target, prop, value );

            case PROP_TYPE_OBJECT:
                return ( target[ prop ] = value );
        }
    }

    var valueStrategies = new Map();

    valueStrategies.set( VALUE_TYPE_NORMAL, {
        init: function( tween, prevTween ) {
            var parts, operator, number, unit = '',
                to = tween.to,
                from = tween.from,
                multiple = false;

            function getOrgValue() {
                return getOriginalValue( tween.animatable.target, tween.property, unit, tween.propType );
            }

            if ( to === 'auto' ) {
                to = getOrgValue();
            }

            parts = decomposeValue( to );

            if ( parts ) {
                operator = parts[1];
                number = parseFloat( parts[2] ) || 0;
                unit = parts[3];

                if ( to === Number(0) && from !== 'auto' ) {
                    unit = (decomposeValue( from ) || [])[3];
                }
                from = parseFloat( from !== 'auto' ? from : prevTween ? prevTween.to : getOrgValue() ) || 0;
            } else {
                to = ( to = to.match( rNums ) ) ? arrayMap( to, Number ) : [];
                from = from !== 'auto' ?
                    arrayMap( from.match( rNums ) || [], Number ) :
                    prevTween ? prevTween.to : arrayMap( getOrgValue().match( rNums ) || [], Number );
                multiple = true;
            }
            


            return {
                from: from,
                to: multiple ? to : getRelativeValue( from, number, operator ),
                unit: unit || getDefaultUnit( tween.property, tween.propType ),
                multiple: multiple
            };
        },

        get: function( progress, tween ) {
            if ( !tween.multiple ) {
                return getTweenValue( progress, tween.from, tween.to, tween ) + tween.unit;
            }

            var i, l,
                value = [],
                from = tween.from;

            for ( i = 0, l = from.length; i < l; i++ ) {
                value.push( getTweenValue( progress, from[i], tween.to[i], tween ) );
            }
            return value.join(' ');
        }
    } );

    valueStrategies.set( VALUE_TYPE_COLOR, {
        init: function( tween, prevTween ) {
            return {
                from: colorToRgba( tween.from !== 'auto' ? tween.from : prevTween ? prevTween.to : css( tween.animatable.target, tween.property ) ),
                to: colorToRgba( tween.to ),
                round: 1
            };
        },

        get: function( progress, tween ) {
            var i, l,
                value = [],
                from = tween.from;

            for ( i = 0, l = from.length; i < l; i++ ) {
                tween.round = i === 3 ? 0 : 1;
                value.push( getTweenValue( progress, from[i], tween.to[i], tween ) );
            }
            return 'opacity' in tween.animatable.target.style ? 'rgba(' + value.join(',') + ')' : rgbToHex.apply(null, value);
        }
    } );

    valueStrategies.set( VALUE_TYPE_GEOMETRY, {
        init: function( tween, prevTween ) {
            return {
                from: 0,
                to: tween.to,
                round: tween.round
            };
        },

        get: function( progress, tween ) {
            var value = getTweenValue( progress, 0, tween.to.totalLength, tween ),
                // svg = tween.to.el.viewportElement,
                // ratioX = getSvgWidthOrHeight( svg, 'width' ) / svg.viewBox.baseVal.width,
                // ratioY = getSvgWidthOrHeight( svg, 'height' ) / svg.viewBox.baseVal.height,
                // ratio = Math.min( ratioX, ratioY ),
                p0 = getPoint(-1),
                p1 = getPoint(0);

            function getPoint( offset ) {
                return getPointAtLength( tween.to.el, value + offset );
            }

            switch ( tween.to.property ) {
                case 'x':
                    return p1.x + 'px';
                case 'y':
                    return p1.y + 'px';
                case 'angle':
                    return getAngleByLine( p0, p1 ) + 'deg';
            }
        }
    } );

    function createAnimation( tweens ) {
        function update( progress ) {
            var i, tween, rightTween;

            for ( i = 0; ( tween = tweens[i++] ); ) {
                if ( tween.begin <= progress && tween.end >= progress ) {
                    rightTween = tween;
                    break;
                }
                if ( progress > tween.end ) {
                    if ( !tweens[i+1] || tweens[i+1].begin > progress ) {
                        rightTween = tween;
                    }
                }
                
            }

            if ( rightTween ) {
                setTargetValue( rightTween, rightTween.get( progress, rightTween ) );
            }
        }

        return {
            update: update,
            tweens: tweens
        };
    }


    /*
    |-------------------------------------------------------------------------------
    | 对外接口
    |-------------------------------------------------------------------------------
    |
    */
    function animate( configuration ) {
        return createTimeline( configuration );
    }

    animate.random = random;
    animate.geometry = getGeometry;
    animate.setDashoffset = setDashoffset;
    animate.addEasing = function( name, handle ) {
        if ( isPlainObject( name ) ) {
            for ( var i in name ) {
                easing[i] = name[i];
            }
        } else {
            easing[ name ] = handle;
        }
    };

    animate.stagger = stagger;
    animate.engine = engine;

    return animate;

})));
