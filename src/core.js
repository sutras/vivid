import easing from './easing';
import engine from './engine';
import stagger from './stagger';
import Map from './map';
import Set from './set';
import {
    copyObject, overrideObject, assignObject,
    isPlainObject, isEmptyObject, isArrayLike,
    flattenArray, uniqueArray, isFunction,
    sortBy, random, rCssNumVal,
} from './util';


/*
|-------------------------------------------------------------------------------
| 全局内部变量
|-------------------------------------------------------------------------------
|
*/
const DIRECTION_ALTERNATE_REVERSE = 'alternate-reverse';
const DIRECTION_REVERSE = 'reverse';
const DIRECTION_ALTERNATE = 'alternate';


// 插件（洋葱模型）
const plugins = [];
const ids = {};

// 类型
const SPECIAL_VALUE = {};
const TERMINATE = {};
const WITH_FROM = {};
const KEYFRAMES = {};

function parseTargets( target ) {
    let result = [],
        i, l, item;

    if ( !Array.isArray( target ) ) {
        target = [target];
    }
    target = flattenArray( target );
    for ( i = 0, l = target.length; i < l; i++ ) {
        item = target[i];
        if ( item ) {
            if ( typeof item === 'string' &&
                        (item = document.querySelectorAll( item )) ||
                        isArrayLike( item ) ) {
                result.push.apply( result, item );
            } else if ( typeof item === 'object' || typeof item === 'function' ) {
                result.push( item );
            }
        }
    }
    return uniqueArray( result );
}
function getEasing( ease ) {
    return isFunction( ease ) ? ease : easing[ ease ] || easing[ easing.def ];
}

function isReverse( direction ) {
    return direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE;
}

function isAlternate( direction ) {
    return direction === DIRECTION_ALTERNATE || direction === DIRECTION_ALTERNATE_REVERSE;
}

function getFuncValue( value, animatable ) {
    return isFunction( value ) ? value( animatable.target, animatable.id, animatable.total ) : value;
}

function getTweenValue( progress, tween ) {
    let duration = tween.duration,
        delay = tween.delay,
        begin = tween.begin;

    function getOneItem( item ) {
        let value,
            from = item.from,
            to = item.to,
            round = item.round;

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

    return tween.between.map(item => getOneItem( item ));
}


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
    return targets.map(( target, i ) => ({
        target,
        id: i,
        total: targets.length
    }));
}

// # 基础类型
// - 数值
// - 字符串
// - 数组
// - 对象
// 
// # 特殊类型
// - 带起始值 withFrom
// - 关键帧 keyframes
// - 其他类型

// 统一转换为 [{ value }]

function structureTween( value, animatable, keyframe ) {
    value = getFuncValue( value, animatable );

    if ( value.type === KEYFRAMES ) {
        return value.keyframes.map( value => structureTween( value, animatable, true ) );
    }
    if ( !isPlainObject( value ) || value.sign === SPECIAL_VALUE ) {
        value = { value };
    }
    return keyframe ? value : [ value ];
}

function normalizeTweens( animatable, tweenConfigs, property, options, beginTime, animationProperties, averageDuration ) {
    let duration = averageDuration === void 0 ? options.duration : averageDuration,
        l = tweenConfigs.length,
        tweens,
        endTime = beginTime || 0,
        prevTween;

    averageDuration = duration / l;

    function normalizeTween( tweenConfig, index, prevTween ) {
        let duration = getFuncValue( tweenConfig.duration === void 0 ? averageDuration : tweenConfig.duration, animatable ),
            delay = getFuncValue( tweenConfig.delay === void 0 ? index === 0 ? options.delay : 0 : tweenConfig.delay, animatable ),
            endDelay = getFuncValue( tweenConfig.endDelay === void 0 ? index === l - 1 ? options.endDelay : 0 : tweenConfig.endDelay, animatable ),
            total = delay + duration + endDelay,
            begin = endTime,
            end = begin + total,
            value, to, from, tween,
            round = tweenConfig.round || options.round,
            easing = getEasing( tweenConfig.easing || options.easing ),
            valueStrategy,
            values, i, l, parts,
            withFrom,
            retValue;

        endTime += total;

        value = tweenConfig.value;
        withFrom = value.type === WITH_FROM;

        // 带有起始值
        if ( withFrom ) {
            from = value.from;
            to = value.to;
        } else {
            to = value;
        }

        if ( !prevTween ) {
            prevTween = animationProperties && !isEmptyObject( animationProperties ) && 
                ( values = animationProperties[ property ] ) ? values[ values.length - 1 ] : null;
        }

        from = withFrom ? getFuncValue( from, animatable ) : ( prevTween ? prevTween.to : animatable.target[ property ] );

        tween = {
            animatable,
            property,
            duration,
            delay,
            endDelay,
            begin,
            end,
            easing,
            pluginData: {}
        };

        if ( parts = rCssNumVal.exec( to ) ) {
            assignObject( tween, {
                operator: parts[1],
                unit: parts[3]
            });
            to = parseFloat( parts[2] ) || 0;
        }

        tween.from = from;
        tween.to = to;
        tween.round = round;

        for ( i = 0, l = plugins.length; i < l; i++ ) {
            retValue = plugins[i].init( tween, TERMINATE );
            if ( retValue === TERMINATE ) {
                break;
            }
        }

        return tween;
    }

    tweens = sortBy( tweenConfigs.map(( tweenConfig, index ) => {
        return ( prevTween = normalizeTween( tweenConfig, index, prevTween ) );
    }), function( item ) {
        return item.begin;
    });

    return {
        endTime,
        tweens
    };
}

function getOneKeyframeSetting( animatable, keyframe, options, beginTime, animationProperties, averageDuration ) {
    let props = {}, p, value;

    for ( p in keyframe ) {
        if ( (value = keyframe[p]) == null ) {
            continue;
        }
        props[p] = normalizeTweens(
            animatable,
            structureTween( value, animatable ),
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
    let oneKeyframeSetting,
        animationProperties = {},
        endTime = 0,
        averageDuration = options.duration / keyframes.length;

    keyframes.forEach( keyframe => {
        let p;

        oneKeyframeSetting = getOneKeyframeSetting( animatable, keyframe, options, endTime, animationProperties, averageDuration );

        for ( p in oneKeyframeSetting ) {
            endTime = Math.max( endTime, oneKeyframeSetting[p].endTime );
            animationProperties[p] = ( animationProperties[p] || [] ).concat( oneKeyframeSetting[p].tweens );
        }
    });

    return animationProperties;
}

function flattenKeyframesAnimationProperties( animationPropertiesGroup ) {
    let animationProperties = animationPropertiesGroup[0],
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
    return flattenKeyframesAnimationProperties( [ keyframes, [ properties ] ].map( keyframes => {
        return getKeyframesAnimationProperties( animatable, keyframes, options );
    }) );
}

function getAnimations( animatables, properties, keyframes, options ) {
    return flattenArray( animatables.map( animatable => {
        let animationProperties = getAllAnimationProperties( animatable, properties || {}, keyframes || [], options ),
            p, animations = [];

        for ( p in animationProperties ) {
            animations.push( createAnimation( animationProperties[p] ) );
        }

        return animations;
    }) );
}

function getAnimationsDuration( animations ) {
    return Math.max.apply( null, animations.map( animation => {
        return Math.max.apply( null, animation.tweens.map( tween => tween.end) );
    }) );
}

const defaultTimelineSettings = {
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

const defaultTweenSettings = {
    duration: 400,
    delay: 0,
    endDelay: 0,
    easing: easing.def,
    round: 0
};

function createTimeline( configuration ) {
    let timelineOptions, tweenOptions,
        targets, autoplay, delegate, loopAmount, loopCount, reversed,
        animatables, animations,
        isPlaying = false,
        started = false,
        duration = 0,
        startTime = 0,
        position = 0;

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

    function isCompleted() {
        return loopCount === 0 && position === duration && !isPlaying;
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
            position = 0;
        }
        invokeCallback('loopBegin');
        play();
    }

    function restart() {
        pause();
        position = 0;
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
        // complete状态下，调用play，相当于调用restart
        if ( isCompleted() ) {
            return restart();
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
        let finished,
            i = 0,
            l = animations.length;

        if ( progress >= duration ) {
            progress = duration;
            finished = true;
        }
        position = progress || 0;

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
            let currTime = new Date();
            // currTime - startTime：两次tick的时间间隔
            // startTime：默认添加到引擎的时间，之后为上一次tick的时间
            seek( currTime - startTime + position );
            startTime = currTime;
        }
    }

    function finish() {
        if ( !isCompleted() ) {
            seek( duration );
        }
    }

    return {
        animations,
        restart,
        play,
        pause,
        seek,
        finish,
        tick() {
            if ( delegate ) {
                tick();
            }
        },
        getPosition() {
            return position;
        },
        getDuration() {
            return duration;
        },
        getProgress() {
            return duration === 0 ? 0 : position / duration;
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
function createAnimation( tweens ) {
    function update( progress ) {
        let i, tween, currTween, value, calcVal;

        for ( i = 0; ( tween = tweens[i++] ); ) {
            if ( tween.begin <= progress && tween.end >= progress ) {
                currTween = tween;
                break;
            }
            if ( progress > tween.end ) {
                if ( !tweens[i + 1] || tweens[i + 1].begin > progress ) {
                    currTween = tween;
                }
            }
        }

        if ( currTween ) {
            value = getTweenValue( progress, currTween );

            for ( i = plugins.length - 1; i >= 0; i-- ) {
                calcVal = plugins[i].update( currTween, value, TERMINATE );
                if ( calcVal === TERMINATE ) {
                    return;
                }
                if ( calcVal !== void 0 ) {
                    value = calcVal;
                }
            }
        }
    }

    return {
        update,
        tweens
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

animate.addEasing = function( name, handle ) {
    if ( isPlainObject( name ) ) {
        for ( let i in name ) {
            easing[i] = name[i];
        }
    } else {
        easing[ name ] = handle;
    }
};

animate.withFrom = function( from, to ) {
    return {
        from,
        to,
        sign: SPECIAL_VALUE,
        type: WITH_FROM
    };
};

// 属性关键帧
animate.keyframes = function( keyframes ) {
    return {
        type: KEYFRAMES,
        keyframes
    };
};

animate.stagger = stagger;
animate.engine = engine;
animate.random = random;
animate.Set = Set;
animate.Map = Map;

animate.use = function( plugin ) {
    let priority, i, l, id;

    if ( !plugin || !( id = plugin.id ) || ids[ id ] ) {
        return;
    }

    // 优先级越高，越早读取，越晚写入
    priority = plugin.priority || 0;
    for ( i = 0, l = plugins.length; i < l; i++ ) {
        if ( priority > plugins[i].priority ) {
            break;
        }
    }
    plugins.splice( i, 0, plugin );

    ids[ id ] = true;

    if ( isFunction( plugin.install ) ) {
        plugin.install( animate, SPECIAL_VALUE );
    }
};

export default animate;