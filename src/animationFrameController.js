/*
|-------------------------------------------------------------------------------
| requestAnimationFrame
|-------------------------------------------------------------------------------
|
| 改编自司徒正美《javascript框架设计》
|
*/
export default function getAnimationFrameController() {
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
            request( callback ) {
                return window.webkitRequestAnimationFrame(() => callback( new Date() - 0 ));
            },
            cancel: window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame
        };
    }

    let millisec = 1000 / 60,
        callbacks = [],
        id = 1,
        cursor = 0,
        timer;

    function playAll() {
        let i, cloned, callback;

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
        request( handler ) {
            callbacks.push( handler );
            if ( !timer ) {
                timer = window.setTimeout( playAll, millisec );
            }
            return id++;
        },
        cancel( id ) {
            callbacks[id - cursor] = 'cancelled';
        }
    };
}