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
    let radian = getRadianByLine( p1, p2 ),
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
    let rx = getBaseVal( elem, 'rx' ),
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
    let points = elem.points,
        i, totalLength = 0;

    for ( i = 1; i < points.numberOfItems; i++ ) {
        totalLength += getDistance( points.getItem(i - 1), points.getItem(i) );
    }
    return totalLength;
}

function getPolygonTotalLength( elem ) {
    let points = elem.points;
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
    let radius = getBaseVal( elem, 'r' ),
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
    let totalLength = getTotalLength( elem ),
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
    let x = getBaseVal( elem, 'x' ),
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
    let points = elem.points,
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

function getSvgWidthOrHeight( svg, size ) {
    try {
        return getBaseVal( svg, 'width' );
    } catch( err ) {
        //处理低版本chrome抛出来的异常：Error: NOT_SUPPORTED_ERR: DOM Exception 9
        return parseFloat( getStyle( svg, size ) );
    }
}

const SVG = {};

function getGeometry( elem, percent ) {
    elem = typeof elem === 'string' ? document.querySelector( elem ) : elem;
    percent = percent || 100;

    return function( property ) {
        return {
            el: elem,
            property: property,
            totalLength: getTotalLength( elem ) * ( percent / 100 ),
            type: SVG
        };
    };
}

function setDashoffset( elem ) {
    let length = getTotalLength( elem );
    elem.setAttribute( 'stroke-dasharray', length );
    return length;
}

export default {
    id: 'svg',
    install: function( animate ) {
        animate.geometry = getGeometry;
        animate.setDashoffset = setDashoffset;
    },
    init: function( tween ) {
        let data = tween.pluginData,
            between = tween.between[0],
            to = between.to;

        if ( to && to.type === SVG ) {
            between.from = 0;
            data.svg = {
                geometry: to
            };
            between.to = to.totalLength;
        }
    },
    update: function( progress, tween, value ) {
        let svgData = tween.pluginData.svg,
            p0, p1;

        if ( !svgData ) {
            return;
        }

        value = value[0];
        tween.unit = '';

        p0 = getPoint(-1);
        p1 = getPoint(0);

        function getPoint( offset ) {
            return getPointAtLength( svgData.geometry.el, value + offset );
        }

        switch ( svgData.geometry.property ) {
            case 'x':
                return p1.x + 'px';
            case 'y':
                return p1.y + 'px';
            case 'angle':
                return getAngleByLine( p0, p1 ) + 'deg';
        }
    }
};