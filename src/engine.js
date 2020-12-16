/*
|-------------------------------------------------------------------------------
| 引擎
|-------------------------------------------------------------------------------
|
| 使用requestAnimationFrame或定时器驱动集合里面的时间轴运行调用。
| 引擎对外暴露了add和remove两个方法用来向引擎添加或删除时间轴。
|
*/
import getAnimationFrameController from './animationFrameController';
import Set from './set';

const { request, cancel } = getAnimationFrameController();
let timelines = new Set(),
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

export default {
    add,
    remove
};