/**
 * @version v0.7.2
 * @link https://github.com/sutras/vivid#readme
 * @license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vivid = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /*
  |-------------------------------------------------------------------------------
  | 缓动公式
  |-------------------------------------------------------------------------------
  |
  */
  var easing = {
    def: 'easeInOutQuad',
    linear: function linear(k) {
      //无缓动效果
      return k;
    },
    easeInQuad: function easeInQuad(k) {
      return k * k;
    },
    easeOutQuad: function easeOutQuad(k) {
      return k * (2 - k);
    },
    easeInOutQuad: function easeInOutQuad(k) {
      if ((k *= 2) < 1) return 0.5 * k * k;
      return -0.5 * (--k * (k - 2) - 1);
    },
    easeInCubic: function easeInCubic(k) {
      return k * k * k;
    },
    easeOutCubic: function easeOutCubic(k) {
      return --k * k * k + 1;
    },
    easeInOutCubic: function easeInOutCubic(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k;
      return 0.5 * ((k -= 2) * k * k + 2);
    },
    easeInQuart: function easeInQuart(k) {
      return k * k * k * k;
    },
    easeOutQuart: function easeOutQuart(k) {
      return 1 - --k * k * k * k;
    },
    easeInOutQuart: function easeInOutQuart(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k;
      return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    easeInQuint: function easeInQuint(k) {
      return k * k * k * k * k;
    },
    easeOutQuint: function easeOutQuint(k) {
      return --k * k * k * k * k + 1;
    },
    easeInOutQuint: function easeInOutQuint(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    easeInSine: function easeInSine(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    easeOutSine: function easeOutSine(k) {
      return Math.sin(k * Math.PI / 2);
    },
    easeInOutSine: function easeInOutSine(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    easeInExpo: function easeInExpo(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    easeOutExpo: function easeOutExpo(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    easeInOutExpo: function easeInOutExpo(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    easeInCirc: function easeInCirc(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    easeOutCirc: function easeOutCirc(k) {
      return Math.sqrt(1 - --k * k);
    },
    easeInOutCirc: function easeInOutCirc(k) {
      if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    easeInElastic: function easeInElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    easeOutElastic: function easeOutElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    easeInOutElastic: function easeInOutElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      k *= 2;
      if (k < 1) return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    },
    easeInBack: function easeInBack(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    easeOutBack: function easeOutBack(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    easeInOutBack: function easeInOutBack(k) {
      var s = 1.70158 * 1.525;
      if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
    easeInBounce: function easeInBounce(k) {
      return 1 - easing.easeOutBounce(1 - k);
    },
    easeOutBounce: function easeOutBounce(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    easeInOutBounce: function easeInOutBounce(k) {
      if (k < 0.5) return easing.easeInBounce(k * 2) * 0.5;
      return easing.easeOutBounce(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | requestAnimationFrame
  |-------------------------------------------------------------------------------
  |
  | 改编自司徒正美《javascript框架设计》
  |
  */
  function getAnimationFrameController() {
    // IE10、chrome24
    if (window.requestAnimationFrame) {
      return {
        request: requestAnimationFrame,
        cancel: cancelAnimationFrame
      };
    } // Firefox11没有实现 cancelRequestAnimiationFrame
    // 并且 mozRequestAnimationFrame 与标准出入过大


    if (window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame) {
      return {
        request: mozRequestAnimationFrame,
        cancel: mozCancelAnimationFrame
      };
    } // 某个webkit版本没有返回id值，因此要用setInterval实现


    if (window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String)) {
      return {
        // 修正某个特异的webkit版本下没有time参数（意义不大，而且这个time并不是页面打开到如今的毫秒数）
        request: function request(callback) {
          return window.webkitRequestAnimationFrame(function () {
            return callback(new Date() - 0);
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
      callbacks.length = 0; // 清空队列

      for (i = 0; callback = cloned[i++];) {
        if (callback !== 'cancelled') {
          callback(new Date() - 0);
        }
      }
    }

    return {
      request: function request(handler) {
        callbacks.push(handler);

        if (!timer) {
          timer = window.setTimeout(playAll, millisec);
        }

        return id++;
      },
      cancel: function cancel(id) {
        callbacks[id - cursor] = 'cancelled';
      }
    };
  }

  /*
  |-------------------------------------------------------------------------------
  | Set
  |-------------------------------------------------------------------------------
  |
  */
  var Set = window.Set && window.Set.prototype.forEach ? window.Set : function () {
    function Set(arr) {
      this.values = [];
      this.size = 0;

      if (Array.isArray(arr)) {
        this.values = arr.slice();
        this.size = arr.length;
      } else if (arr instanceof Set) {
        this.values = arr.values.slice();
        this.size = arr.size;
      }
    }

    Set.prototype = {
      add: function add(value) {
        if (this.values.indexOf(value) === -1) {
          this.values.push(value);
          this.size++;
        }

        return this;
      },
      has: function has(value) {
        return this.values.indexOf(value) !== -1;
      },
      forEach: function forEach(fn) {
        for (var i = 0; i < this.size; i++) {
          fn(this.values[i], this.values[i], this);
        }
      },
      'delete': function _delete(value) {
        var i;

        if ((i = this.values.indexOf(value)) !== -1) {
          this.values.splice(i, 1);
          this.size--;
          return true;
        }

        return false;
      }
    };
    return Set;
  }();

  /*
  |-------------------------------------------------------------------------------
  | 引擎
  |-------------------------------------------------------------------------------
  |
  | 使用requestAnimationFrame或定时器驱动集合里面的时间轴运行调用。
  | 引擎对外暴露了add和remove两个方法用来向引擎添加或删除时间轴。
  |
  */

  var _getAnimationFrameCon = getAnimationFrameController(),
      request = _getAnimationFrameCon.request,
      cancel = _getAnimationFrameCon.cancel;

  var timelines = new Set(),
      id = null,
      paused = true;

  function add(tick) {
    timelines.add(tick);
    run();
  }

  function remove(tick) {
    timelines['delete'](tick);
  }

  function step() {
    if (timelines.size === 0) {
      stop();
    } else {
      new Set(timelines).forEach(function (tick) {
        return tick();
      });
      id = request(step);
    }
  }

  function run() {
    if (paused) {
      paused = false;
      id = request(step);
    }
  }

  function stop() {
    if (!paused) {
      paused = true;
      cancel(id);
    }
  }

  var engine = {
    add: add,
    remove: remove
  };

  /*
  |-------------------------------------------------------------------------------
  | 工具函数
  |-------------------------------------------------------------------------------
  |
  */
  var rNum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;
  var rUnit = /%|px|em|ex|ch|rem|vw|vh|vmin|vmax|pc|pt|in|cm|mm|deg|rad|turn/;
  var rCssNumVal = new RegExp('^([+\\-*/%]=|)(' + rNum.source + ')(' + rUnit.source + '|)$', 'i');
  var rNums = new RegExp(rNum.source, 'g');
  var toString = Object.prototype.toString;
  function assignObjectProp(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in options) {
        target[j] = options[j];
      }
    }

    return target;
  }
  function copyObject(target) {
    var i,
        obj = {};

    for (i in target) {
      obj[i] = target[i];
    }

    return obj;
  }
  function overrideObject(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in target) {
        if (options && options.hasOwnProperty(j)) {
          target[j] = options[j];
        }
      }
    }

    return target;
  }
  function assignObject(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in options) {
        target[j] = options[j];
      }
    }

    return target;
  }
  function isFunction(target) {
    return typeof target === 'function';
  }
  function isPlainObject(target) {
    return toString.call(target) === '[object Object]';
  }
  function isEmptyObject(target) {
    var i;

    for (i in target) {
      break;
    }

    return i === void 0;
  }
  function isArrayLike(target) {
    return target != null && _typeof(target) === 'object' && isFinite(target.length) && target.length >= 0 && target.length === Math.floor(target.length) && target.length < 4294967296;
  }

  function flattenArray(target, depth) {
    var result = [],
        i,
        l,
        item;
    depth = depth || 1;

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];
      result = result.concat(Array.isArray(item) && depth > 1 ? flattenArray(item, depth - 1) : item);
    }

    return result;
  } // 数组去重

  function uniqueArray(target) {
    var result = [],
        i,
        l,
        item;

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];

      if (target.indexOf(item) === i) {
        result.push(item);
      }
    }

    return result;
  }
  function arrayPluck(target, key) {
    var result = [],
        prop,
        i = 0,
        l = target.length;

    for (; i < l; i++) {
      prop = target[i][key];

      if (prop != null) {
        result.push(prop);
      }
    }

    return result;
  }
  function sortBy(target, fn, scope) {
    var array = target.map(function (item, index) {
      return {
        el: item,
        ret: fn.call(scope, item, index)
      };
    }).sort(function (left, right) {
      var a = left.ret,
          b = right.ret; // 字符串不能相减，但可以比较大小，显式返回大于0、小于0、0等于就可以满足sort函数的要求

      return a < b ? -1 : a > b ? 1 : 0;
    });
    return arrayPluck(array, 'el');
  }
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
  function stagger(val, options) {
    options = assignObjectProp({}, staggerOptions, options);
    var direction = options.direction,
        tween = isFunction(options.easing) ? options.easing : easing[options.easing],
        grid = options.grid,
        axis = options.axis,
        fromIndex = options.from || 0,
        fromFirst = fromIndex === 'first',
        fromCenter = fromIndex === 'center',
        fromLast = fromIndex === 'last',
        isRange = Array.isArray(val),
        val1 = isRange ? parseFloat(val[0]) : parseFloat(val),
        val2 = isRange ? parseFloat(val[1]) : 0,
        start = options.start || 0 + (isRange ? val1 : 0),
        values = [],
        maxValue = 0;
    return function (index, total) {
      var i, fromX, fromY, toX, toY, distanceX, distanceY, value, spacing;
      fromIndex = fromFirst ? 0 : fromCenter ? (total - 1) / 2 : fromLast ? total - 1 : fromIndex;

      if (!values.length) {
        for (i = 0; i < total; i++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - i));
          } else {
            fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            toX = i % grid[0];
            toY = Math.floor(i / grid[0]);
            distanceX = fromX - toX;
            distanceY = fromY - toY;
            value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            value = axis === 'x' ? -distanceX : axis === 'y' ? -distanceY : value;
            values.push(value);
          }

          maxValue = Math.max.apply(null, values);
        }

        if (tween) {
          values = values.map(function (val) {
            return tween(val / maxValue) * maxValue;
          });
        }

        if (direction === 'reverse') {
          values = values.map(function (val) {
            return axis ? -val : Math.abs(maxValue - val);
          });
        }
      }

      spacing = isRange ? (val2 - val1) / maxValue : val1;

      if (spacing === Infinity) {
        spacing = 0;
      }

      return start + spacing * (Math.round(values[index] * 100) / 100);
    };
  }

  /*
  |-------------------------------------------------------------------------------
  | Map
  |-------------------------------------------------------------------------------
  |
  */
  var Map = window.Map && window.Map.prototype.forEach ? window.Map : function () {
    function Map() {
      this.keys = [];
      this.values = [];
      this.size = 0;
    }

    Map.prototype = {
      set: function set(key, value) {
        var i;

        if ((i = this.keys.indexOf(key)) === -1) {
          this.keys.push(key);
          this.size = this.keys.length;
          return this.values.push(value);
        }

        this.values[i] = value;
      },
      get: function get(key) {
        return this.values[this.keys.indexOf(key)];
      },
      has: function has(key) {
        return this.keys.indexOf(key) !== -1;
      },
      forEach: function forEach(fn) {
        for (var i = 0; i < this.size; i++) {
          fn(this.values[i], this.keys[i], this);
        }
      },
      'delete': function _delete(key) {
        var i;

        if ((i = this.keys.indexOf(key)) !== -1) {
          this.keys.splice(i, 1);
          this.values.splice(i, 1);
          this.size = this.keys.length;
          return true;
        }

        return false;
      }
    };
    return Map;
  }();

  /*
  |-------------------------------------------------------------------------------
  | 全局内部变量
  |-------------------------------------------------------------------------------
  |
  */

  var DIRECTION_ALTERNATE_REVERSE = 'alternate-reverse';
  var DIRECTION_REVERSE = 'reverse';
  var DIRECTION_ALTERNATE = 'alternate'; // 插件（洋葱模型）

  var plugins = [];
  var ids = {}; // 类型

  var SPECIAL_VALUE = {};
  var TERMINATE = {};
  var WITH_FROM = {};
  var KEYFRAMES = {};

  function parseTargets(target) {
    var result = [],
        i,
        l,
        item;

    if (!Array.isArray(target)) {
      target = [target];
    }

    target = flattenArray(target);

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];

      if (item) {
        if (typeof item === 'string' && (item = document.querySelectorAll(item)) || isArrayLike(item)) {
          result.push.apply(result, item);
        } else if (_typeof(item) === 'object' || typeof item === 'function') {
          result.push(item);
        }
      }
    }

    return uniqueArray(result);
  }

  function getEasing(ease) {
    return isFunction(ease) ? ease : easing[ease] || easing[easing.def];
  }

  function isReverse(direction) {
    return direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE;
  }

  function isAlternate(direction) {
    return direction === DIRECTION_ALTERNATE || direction === DIRECTION_ALTERNATE_REVERSE;
  }

  function getFuncValue(value, animatable) {
    return isFunction(value) ? value(animatable.id, animatable.total, animatable.target) : value;
  }

  function getTweenValue(progress, tween) {
    var duration = tween.duration,
        delay = tween.delay,
        begin = tween.begin;

    function getOneItem(item) {
      var value,
          from = item.from,
          to = item.to,
          round = item.round;
      value = progress <= begin + delay ? from : progress >= begin + delay + duration ? to : from + tween.easing((progress - begin - delay) / duration) * (to - from);

      if (round) {
        value = Math.round(value * round) / round;
      }

      return value;
    }

    return tween.between.map(function (item) {
      return getOneItem(item);
    });
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


  function getAnimatables(targets) {
    return targets.map(function (target, i) {
      return {
        target: target,
        id: i,
        total: targets.length
      };
    });
  } // # 基础类型
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


  function structureTween(value, animatable, properties) {
    value = getFuncValue(value, animatable);

    if (value.type === KEYFRAMES) {
      return value.keyframes.map(function (value) {
        return structureTween(value, animatable, true);
      });
    }

    if (!isPlainObject(value) || value.sign === SPECIAL_VALUE) {
      value = {
        value: value
      };
    }

    return properties ? value : [value];
  }

  function normalizeTweens(animatable, tweenConfigs, property, options, beginTime, animationProperties, averageDuration) {
    var duration = averageDuration === void 0 ? options.duration : averageDuration,
        l = tweenConfigs.length,
        tweens,
        endTime = beginTime || 0,
        prevTween;
    averageDuration = duration / l;

    function normalizeTween(tweenConfig, index, prevTween) {
      var duration = getFuncValue(tweenConfig.duration === void 0 ? averageDuration : tweenConfig.duration, animatable),
          delay = getFuncValue(tweenConfig.delay === void 0 ? index === 0 ? options.delay : 0 : tweenConfig.delay, animatable),
          endDelay = getFuncValue(tweenConfig.endDelay === void 0 ? index === l - 1 ? options.endDelay : 0 : tweenConfig.endDelay, animatable),
          total = delay + duration + endDelay,
          begin = endTime,
          end = begin + total,
          value,
          to,
          from,
          tween,
          round = tweenConfig.round || options.round,
          easing = getEasing(tweenConfig.easing || options.easing),
          values,
          i,
          l,
          parts,
          withFrom,
          retValue;
      endTime += total;
      value = tweenConfig.value;
      withFrom = value.type === WITH_FROM; // 带有起始值

      if (withFrom) {
        from = value.from;
        to = value.to;
      } else {
        to = value;
      }

      if (!prevTween) {
        prevTween = animationProperties && !isEmptyObject(animationProperties) && (values = animationProperties[property]) ? values[values.length - 1] : null;
      }

      from = withFrom ? getFuncValue(from, animatable) : prevTween ? prevTween.to : animatable.target[property];
      tween = {
        animatable: animatable,
        property: property,
        duration: duration,
        delay: delay,
        endDelay: endDelay,
        begin: begin,
        end: end,
        easing: easing,
        pluginData: {}
      };

      if (parts = rCssNumVal.exec(to)) {
        assignObject(tween, {
          operator: parts[1],
          unit: parts[3]
        });
        to = parseFloat(parts[2]) || 0;
      }

      tween.from = from;
      tween.to = to;
      tween.round = round;

      for (i = 0, l = plugins.length; i < l; i++) {
        retValue = plugins[i].init(tween, TERMINATE);

        if (retValue === TERMINATE) {
          break;
        }
      }

      return tween;
    }

    tweens = sortBy(tweenConfigs.map(function (tweenConfig, index) {
      return prevTween = normalizeTween(tweenConfig, index, prevTween);
    }), function (item) {
      return item.begin;
    });
    return {
      endTime: endTime,
      tweens: tweens
    };
  }

  function getOneKeyframeSetting(animatable, properties, options, beginTime, animationProperties, averageDuration) {
    var props = {},
        p,
        value;

    for (p in properties) {
      if ((value = properties[p]) == null) {
        continue;
      }

      props[p] = normalizeTweens(animatable, structureTween(value, animatable), p, options, beginTime, animationProperties, averageDuration);
    }

    return props;
  }

  function getKeyframesAnimationProperties(animatable, keyframes, options) {
    var oneKeyframeSetting,
        animationProperties = {},
        endTime = 0,
        averageDuration = options.duration / keyframes.length;
    keyframes.forEach(function (properties) {
      var p;
      oneKeyframeSetting = getOneKeyframeSetting(animatable, properties, options, endTime, animationProperties, averageDuration);

      for (p in oneKeyframeSetting) {
        endTime = Math.max(endTime, oneKeyframeSetting[p].endTime);
        animationProperties[p] = (animationProperties[p] || []).concat(oneKeyframeSetting[p].tweens);
      }
    });
    return animationProperties;
  }

  function flattenKeyframesAnimationProperties(animationPropertiesGroup) {
    var animationProperties = animationPropertiesGroup[0],
        i,
        l = animationPropertiesGroup.length,
        p,
        anotherAnimationProperties;

    for (i = 1; i < l; i++) {
      anotherAnimationProperties = animationPropertiesGroup[i];

      for (p in anotherAnimationProperties) {
        animationProperties[p] = (animationProperties[p] || []).concat(anotherAnimationProperties[p]);
      }
    }

    return animationProperties;
  }

  function getAllAnimationProperties(animatable, keyframes, options) {
    return flattenKeyframesAnimationProperties([keyframes].map(function (keyframes) {
      return getKeyframesAnimationProperties(animatable, keyframes, options);
    }));
  }

  function getAnimations(animatables, keyframes, options) {
    keyframes = Array.isArray(keyframes) ? keyframes : [keyframes];
    return flattenArray(animatables.map(function (animatable) {
      var animationProperties = getAllAnimationProperties(animatable, keyframes, options),
          p,
          animations = [];

      for (p in animationProperties) {
        animations.push(createAnimation(animationProperties[p]));
      }

      return animations;
    }));
  }

  function getAnimationsDuration(animations) {
    return Math.max.apply(null, animations.map(function (animation) {
      return Math.max.apply(null, animation.tweens.map(function (tween) {
        return tween.end;
      }));
    }));
  }

  var defaultTimelineSettings = {
    autoplay: true,
    delegate: false,
    loop: 0,
    direction: 'normal',
    // normal, reverse, alternate, alternate-reverse
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
    easing: easing.def,
    round: 0
  };

  function createTimeline(targets, keyframes, configuration) {
    var timelineOptions,
        tweenOptions,
        autoplay,
        delegate,
        loopAmount,
        loopCount,
        reversed,
        animatables,
        animations,
        isPlaying = false,
        started = false,
        duration = 0,
        startTime = 0,
        position = 0;
    timelineOptions = overrideObject(copyObject(defaultTimelineSettings), configuration);
    tweenOptions = overrideObject(copyObject(defaultTweenSettings), configuration);
    targets = parseTargets(targets);
    autoplay = timelineOptions.autoplay;
    delegate = timelineOptions.delegate;
    loopAmount = timelineOptions.loop === true ? Infinity : timelineOptions.loop || 1;
    loopCount = loopAmount;
    reversed = isReverse(timelineOptions.direction);
    animatables = getAnimatables(targets);
    animations = getAnimations(animatables, keyframes || [], tweenOptions);
    duration = getAnimationsDuration(animations);

    if (autoplay) {
      start();
    }

    function isCompleted() {
      return loopCount === 0 && position === duration && !isPlaying;
    }

    function invokeCallback(name) {
      if (isFunction(timelineOptions[name])) {
        timelineOptions[name]();
      }
    }

    function start() {
      if (!started) {
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
      reversed = isReverse(timelineOptions.direction);
      play();
    }

    function play() {
      // 第一次start
      if (!started) {
        return start();
      }

      if (isPlaying) {
        return;
      } // complete状态下，调用play，相当于调用restart


      if (isCompleted()) {
        return restart();
      }

      isPlaying = true;
      startTime = new Date();

      if (!delegate) {
        engine.add(_tick);
      }

      invokeCallback('play');
    }

    function pause() {
      if (!isPlaying) {
        return;
      }

      isPlaying = false;

      if (!delegate) {
        engine.remove(_tick);
      }

      invokeCallback('pause');
    }

    function reverse() {
      reversed = !reversed;
    }

    function seek(progress) {
      var finished,
          i = 0,
          l = animations.length;

      if (progress >= duration) {
        progress = duration;
        finished = true;
      }

      position = progress || 0;

      for (; i < l; i++) {
        animations[i].update(reversed ? duration - progress : progress);
      }

      invokeCallback('update');

      if (finished) {
        pause();

        if (isAlternate(timelineOptions.direction)) {
          reverse();
        }

        invokeCallback('loopComplete');

        if (--loopCount < 0) {
          loopCount = 0;
        }

        if (loopCount === 0) {
          invokeCallback('complete');
        } else {
          start();
        }
      }
    }

    function _tick() {
      if (isPlaying) {
        var currTime = new Date(); // currTime - startTime：两次tick的时间间隔
        // startTime：默认添加到引擎的时间，之后为上一次tick的时间

        seek(currTime - startTime + position);
        startTime = currTime;
      }
    }

    function finish() {
      if (!isCompleted()) {
        seek(duration);
      }
    }

    return {
      animations: animations,
      restart: restart,
      play: play,
      pause: pause,
      seek: seek,
      finish: finish,
      tick: function tick() {
        if (delegate) {
          _tick();
        }
      },
      getPosition: function getPosition() {
        return position;
      },
      getDuration: function getDuration() {
        return duration;
      },
      getProgress: function getProgress() {
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


  function createAnimation(tweens) {
    function update(progress) {
      var i, tween, currTween, value, calcVal;

      for (i = 0; tween = tweens[i++];) {
        if (tween.begin <= progress && tween.end >= progress) {
          currTween = tween;
          break;
        }

        if (progress > tween.end) {
          if (!tweens[i + 1] || tweens[i + 1].begin > progress) {
            currTween = tween;
          }
        }
      }

      if (currTween) {
        value = getTweenValue(progress, currTween);

        for (i = plugins.length - 1; i >= 0; i--) {
          calcVal = plugins[i].update(currTween, value, TERMINATE);

          if (calcVal === TERMINATE) {
            return;
          }

          if (calcVal !== void 0) {
            value = calcVal;
          }
        }
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


  function vivid(targets, keyframes, configuration) {
    return createTimeline(targets, keyframes, configuration);
  }

  vivid.addEasing = function (name, handle) {
    if (isPlainObject(name)) {
      for (var i in name) {
        easing[i] = name[i];
      }
    } else {
      easing[name] = handle;
    }
  };

  vivid.withFrom = function (from, to) {
    return {
      from: from,
      to: to,
      sign: SPECIAL_VALUE,
      type: WITH_FROM
    };
  }; // 属性关键帧


  vivid.keyframes = function (keyframes) {
    return {
      type: KEYFRAMES,
      keyframes: keyframes
    };
  };

  vivid.stagger = stagger;
  vivid.engine = engine;
  vivid.random = random;
  vivid.Set = Set;
  vivid.Map = Map;

  vivid.use = function (plugin) {
    var priority, i, l, id;

    if (!plugin || !(id = plugin.id) || ids[id]) {
      return;
    } // 优先级越高，越早读取，越晚写入


    priority = plugin.priority || 0;

    for (i = 0, l = plugins.length; i < l; i++) {
      if (priority > plugins[i].priority) {
        break;
      }
    }

    plugins.splice(i, 0, plugin);
    ids[id] = true;

    if (isFunction(plugin.install)) {
      plugin.install(vivid, SPECIAL_VALUE);
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 更新守卫
  |-------------------------------------------------------------------------------
  |
  */
  var updateGuardPlugin = {
    id: 'updateGuard',
    priority: 100,
    init: function init() {},
    update: function update(tween, value, TERMINATE) {
      if (Array.isArray(value) && value.length === 1) {
        value = value[0];
      }

      if (!Array.isArray(value) && tween.unit) {
        value += tween.unit;
      }

      tween.animatable.target[tween.property] = value;
      return TERMINATE;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | css插件
  |-------------------------------------------------------------------------------
  |
  */
  var cssProps = {};
  var prefixes = ['', 'webkit', 'Moz', 'O', 'ms'];
  var html = document.documentElement;
  var transformValues = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];
  var transformValuesMap = arrayToObject(transformValues);
  var optionalUnitProperties = arrayToObject(['columnCount', 'fillOpacity', 'fontSizeAdjust', 'fontWeight', 'lineHeight', 'opacity', 'orphans', 'widows', 'zIndex', 'zoom', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'order', 'flexGrow', 'flexShrink', 'scrollLeft', 'scrollTop', 'strokeDashoffset', 'strokeDasharray']);
  var cssTypeWhitelist = arrayToObject(['opacity']);

  function arrayToObject(array, val) {
    var map = {},
        i,
        l;
    val = val === void 0 ? 1 : val;

    for (i = 0, l = array.length; i < l; i++) {
      map[array[i]] = val;
    }

    return map;
  }

  function isElement(target) {
    return target && target.nodeType === 1;
  } // 连字符、小驼峰 -> 大驼峰


  function pascalCase(target) {
    return target.replace(/[-]([^-])/g, function (m, g1) {
      return g1.toUpperCase();
    }).replace(/^./, function (m) {
      return m.toUpperCase();
    });
  } // 连字符、大驼峰 -> 小驼峰


  function camalCase(target) {
    return target.replace(/[-]([^-])/g, function (m, g1) {
      return g1.toUpperCase();
    }).replace(/^./, function (m) {
      return m.toLowerCase();
    });
  }

  function getPrefixedCssProp(name, host) {
    var i, l, prefix, fitName;

    if (cssProps[name]) {
      return cssProps[name];
    }

    host = host || html.style;

    for (i = 0, l = prefixes.length; i < l; i++) {
      prefix = prefixes[i];
      fitName = prefix ? prefix + pascalCase(name) : camalCase(name);

      if (fitName in host) {
        return cssProps[name] = fitName;
      }
    }

    return null;
  }

  function combinedWithUnit(prop, val) {
    return !isNaN(Number(val)) && !optionalUnitProperties[prop] ? val + 'px' : val;
  }

  function getStyle(elem, prop) {
    return (window.getComputedStyle ? window.getComputedStyle(elem) : elem.currentStyle)[getPrefixedCssProp(prop)];
  }

  function setStyle(elem, prop, val) {
    elem.style[getPrefixedCssProp(prop)] = combinedWithUnit(prop, val);
  }

  function setStyleIgnoreUnit(elem, prop, val) {
    elem.style[getPrefixedCssProp(prop)] = val;
  }

  function setStyleFromTransformMap(elem, map) {
    var value = '';
    map.forEach(function (val, key) {
      return value += key + '(' + val + ') ';
    });
    setStyleIgnoreUnit(elem, 'transform', value);
  }

  var cssHooks = {
    _default: {
      get: function get(elem, prop) {
        return getStyle(elem, prop);
      },
      set: function set(elem, prop, val) {
        setStyle(elem, prop, val);
      }
    }
  };
  ['scrollTop', 'scrollLeft'].forEach(function (item) {
    cssHooks[item] = {
      get: function get(elem, prop) {
        return elem[prop];
      },
      set: function set(elem, prop, value) {
        elem[prop] = value;
      }
    };
  });
  transformValues.forEach(function (item) {
    cssHooks[item] = {
      get: function get(elem, prop) {
        return getTransformValuesMap(elem).get(prop);
      },
      set: function set(elem, prop, value) {
        var transformValuesMap = getTransformValuesMap(elem);
        transformValuesMap.set(prop, combinedWithUnit(prop, value));
        setStyleFromTransformMap(elem, transformValuesMap);
      }
    };
  });

  function css(elem, prop, value) {
    var i;

    if (!elem || !prop) {
      return;
    }

    if (isPlainObject(prop)) {
      for (i in prop) {
        css(elem, i, prop[i]);
      }

      return;
    }

    if (value === void 0) {
      return (cssHooks[prop] && cssHooks[prop].get || cssHooks._default.get)(elem, prop);
    }

    (cssHooks[prop] && cssHooks[prop].set || cssHooks._default.set)(elem, prop, value);
  }

  function getDefaultUnit(prop) {
    if (/rotate|skew/.test(prop)) {
      return 'deg';
    }

    if (optionalUnitProperties[prop]) {
      return '';
    }

    return 'px';
  }

  function getTransformValuesMap(target) {
    var str, reg, m, transforms;

    if (!isElement(target)) {
      return;
    }

    transforms = new Map(); // 确保有序性

    str = target.style[getPrefixedCssProp('transform')] || '';
    reg = /(\w+)\(([^)]+)\)/g;

    while (m = reg.exec(str)) {
      transforms.set(m[1], m[2]);
    }

    return transforms;
  }

  function parseUnit(value) {
    return rCssNumVal.test(value) ? RegExp.$3 : '';
  }

  function convertPxToUnit(target, value, unit) {
    var tempEl,
        parentEl,
        baseline = 100,
        factor;

    if ([parseUnit(value), 'deg', 'rad', 'turn'].indexOf(unit) !== -1) {
      return value;
    }

    tempEl = document.createElement(target.tagName);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    parentEl = target.parentNode && target.parentNode !== document ? target.parentNode : document.body;
    parentEl.appendChild(tempEl);
    factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    return factor * parseFloat(value);
  }

  function getCSSOriginalValue(target, prop, unit) {
    var value = getStyle(target, prop);
    return unit ? convertPxToUnit(target, value, unit) : value;
  }

  function getTransformOriginalValue(target, prop, unit) {
    var value = getTransformValuesMap(target).get(prop) || (/scale/.test(prop) ? 1 : 0 + getDefaultUnit(prop));
    return unit ? convertPxToUnit(target, value, unit) : value;
  }

  function getOriginalValue(target, prop, unit, isTransform) {
    return (isTransform ? getTransformOriginalValue : getCSSOriginalValue)(target, prop, unit);
  }

  function isTransform(prop) {
    return !!transformValuesMap[prop];
  }

  var cssPlugin = {
    id: 'css',
    priority: 90,
    install: function install(vivid) {
      vivid.css = css;
      vivid.getPrefixedCssProp = getPrefixedCssProp;
    },
    init: function init(tween) {
      var data = tween.pluginData,
          cssData,
          target = tween.animatable.target,
          property = tween.property;

      if (!isElement(target) || !getPrefixedCssProp(property) && !isTransform(property)) {
        return;
      }

      cssData = data.css = {};

      if (isTransform(property)) {
        cssData.isTransform = true;

        if (!tween.animatable.transforms) {
          tween.animatable.transforms = {
            map: getTransformValuesMap(target)
          };
        }
      }

      if (tween.from == null) {
        tween.from = getOriginalValue(target, property, tween.unit, cssData.isTransform);

        if (rCssNumVal.test(tween.from)) {
          tween.from = parseFloat(RegExp.$2);
        }
      }

      if (!tween.unit) {
        tween.unit = getDefaultUnit(property);
      }
    },
    update: function update(tween, value, TERMINATE) {
      var cssData = tween.pluginData.css,
          property,
          elem = tween.animatable.target;

      if (!cssData) {
        return;
      }

      if (Array.isArray(value)) {
        value = value[0];
      }

      value += tween.unit;
      property = tween.property;

      if (cssData.isTransform) {
        var map = tween.animatable.transforms.map;
        map.set(property, value);
        setStyleFromTransformMap(elem, map);
      } else {
        setStyleIgnoreUnit(elem, property, value);
      }

      return TERMINATE;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 命名颜色
  |-------------------------------------------------------------------------------
  |
  */
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

  /*
  |-------------------------------------------------------------------------------
  | color插件
  |-------------------------------------------------------------------------------
  |
  */

  function hexToRgb(hex) {
    var r = /[0-9a-f]{2}/ig,
        rgb = [];

    while (r.test(hex)) {
      rgb.push(parseInt(RegExp.lastMatch, 16));
    }

    return rgb;
  }

  function pickNumToArray(str) {
    var r = /[.\d]+/g,
        rgb = [];

    while (r.test(str)) {
      rgb.push(Number(RegExp.lastMatch));
    }

    return rgb;
  }

  function hslToRgb(h, s, l) {
    var r, g, b;

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  } // 1. 3位或6位十六进制hex
  // 2. rgb
  // 3. rgba
  // 4. hsl
  // 5. hsla
  // 6. 颜色名


  function colorToRgba(val) {
    var rgba, arr;

    if (/^#?[0-9a-f]{3}$/i.test(val)) {
      rgba = hexToRgb(val.replace(/(.)(.)(.)$/, '$1$1$2$2$3$3'));
    } else if (/^#?([0-9a-f]{6})$/i.test(val)) {
      rgba = hexToRgb(RegExp.$1);
    } else if (/^rgb/i.test(val)) {
      rgba = pickNumToArray(val);
    } else if (/^hsl/i.test(val)) {
      arr = pickNumToArray(val);
      arr[0] /= 360;
      arr[1] /= 100;
      arr[2] /= 100;
      rgba = hslToRgb.apply(null, arr).concat(arr[3]);
    } else if (namedColor.hasOwnProperty(val = String(val).toLowerCase())) {
      rgba = hexToRgb(namedColor[val]);
    } else {
      rgba = [0, 0, 0, 1];
    }

    if (typeof rgba[3] !== 'number') {
      rgba[3] = 1;
    }

    return rgba;
  }

  function isColor(value) {
    return namedColor.hasOwnProperty(String(value).toLowerCase()) || /^(?:rgb|hsl|#(?:[0-9a-f]{6}|[0-9a-f]{3})$)/i.test(value);
  }

  var colorPlugin = {
    id: 'color',
    priority: 80,
    init: function init(tween, TERMINATE) {
      var data = tween.pluginData,
          from,
          to;

      if (typeof tween.to !== "string" || !isColor(tween.to)) {
        return;
      }

      from = colorToRgba(tween.from);
      to = colorToRgba(tween.to);
      tween.between = to.map(function (value, i) {
        return {
          from: from[i],
          to: value,
          round: i === 3 ? 0 : 1
        };
      });
      tween.unit = '';
      data.color = {};
      return TERMINATE;
    },
    update: function update(tween, value) {
      var colorData = tween.pluginData.color;

      if (!colorData) {
        return;
      }

      return 'rgba(' + value.join(',') + ')';
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 处理相对值
  |-------------------------------------------------------------------------------
  |
  */
  function getRelativeValue(from, to, operator) {
    if (!operator) {
      return to;
    }

    switch (operator[0]) {
      case '+':
        return from + to;

      case '-':
        return from - to;

      case '*':
        return from * to;

      case '/':
        return from / to;

      case '%':
        return from / to;
    }
  }

  var relativePlugin = {
    id: 'relative',
    priority: 70,
    init: function init(tween, TERMINATE) {
      var from;

      if (!tween.operator) {
        return;
      }

      from = tween.from;

      if (Array.isArray(from)) {
        from = from[0];
      }

      if (typeof from !== 'number') {
        from = Number(from) || 0;
      }

      tween.to = getRelativeValue(from, parseFloat(tween.to), tween.operator);
      tween.between = [{
        from: from,
        to: tween.to,
        round: tween.round
      }];
      return TERMINATE;
    },
    update: function update() {}
  };

  /*
  |-------------------------------------------------------------------------------
  | svg：路径动画、划线动画
  |-------------------------------------------------------------------------------
  |
  */
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  function getBaseVal(elem, prop) {
    return elem[prop].baseVal.value;
  }

  function getRadianByLine(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  function getAngleByLine(p1, p2) {
    return getRadianByLine(p1, p2) / Math.PI * 180;
  }

  function getPointAtLine(p1, p2, progress) {
    var radian = getRadianByLine(p1, p2),
        x = Math.cos(radian) * progress,
        y = Math.sin(radian) * progress;
    return {
      x: p1.x + x,
      y: p1.y + y
    };
  }

  function getRectTotalLength(elem) {
    return getBaseVal(elem, 'width') * 2 + getBaseVal(elem, 'height') * 2;
  }

  function getCircleTotalLength(elem) {
    return getBaseVal(elem, 'r') * 2 * Math.PI;
  } // 此公式来源于：百度百科椭圆周长第十条公式（该公式发明人周钰承）
  // 通过多次计算得出，此公式获取的周长与chrome浏览器内置的公式获取的周长有一个像素左右的误差。


  function getEllipseTotalLength(elem) {
    var rx = getBaseVal(elem, 'rx'),
        ry = getBaseVal(elem, 'ry'),
        a = Math.max(rx, ry),
        b = Math.min(rx, ry),
        c = (a - b) / (a + b),
        pi = Math.PI,
        pow = Math.pow;
    return pi * (a + b) * (1 + 3 * c * c / (10 + Math.sqrt(4 - 3 * c * c)) + (4 / pi - 14 / 11) * pow(c, 14.233 + 13.981 * pow(c, 6.42)));
  }

  function getLineTotalLength(elem) {
    return getDistance({
      x: getBaseVal(elem, 'x1'),
      y: getBaseVal(elem, 'y1')
    }, {
      x: getBaseVal(elem, 'x2'),
      y: getBaseVal(elem, 'y2')
    });
  }

  function getPolylineTotalLength(elem) {
    var points = elem.points,
        i,
        totalLength = 0;

    for (i = 1; i < points.numberOfItems; i++) {
      totalLength += getDistance(points.getItem(i - 1), points.getItem(i));
    }

    return totalLength;
  }

  function getPolygonTotalLength(elem) {
    var points = elem.points;
    return getPolylineTotalLength(elem) + getDistance(points.getItem(0), points.getItem(points.numberOfItems - 1));
  }

  function getTotalLength(elem) {
    if (elem.getTotalLength) {
      return elem.getTotalLength();
    }

    switch (elem.nodeName.toLowerCase()) {
      case 'rect':
        return getRectTotalLength(elem);

      case 'circle':
        return getCircleTotalLength(elem);

      case 'ellipse':
        return getEllipseTotalLength(elem);

      case 'line':
        return getLineTotalLength(elem);

      case 'polyline':
        return getPolylineTotalLength(elem);

      case 'polygon':
        return getPolygonTotalLength(elem);
    }
  }

  function getPointAtLengthByCircle(elem, length) {
    var radius = getBaseVal(elem, 'r'),
        cx = getBaseVal(elem, 'cx'),
        cy = getBaseVal(elem, 'cy'),
        radian = length / getTotalLength(elem) * 2 * Math.PI,
        ly = Math.sin(radian) * radius,
        lx = Math.cos(radian) * radius;
    return {
      x: cx + lx,
      y: cy + ly
    };
  }

  function getPointAtLengthByEllipse(elem, length) {
    var totalLength = getTotalLength(elem),
        rx = getBaseVal(elem, 'rx'),
        ry = getBaseVal(elem, 'ry'),
        cx = getBaseVal(elem, 'cx'),
        cy = getBaseVal(elem, 'cy'),
        radian = 2 * Math.PI * (length / totalLength);
    return {
      x: rx * Math.cos(radian) + cx,
      y: ry * Math.sin(radian) + cy
    };
  }

  function getPointAtLengthByRect(elem, length) {
    var x = getBaseVal(elem, 'x'),
        y = getBaseVal(elem, 'y'),
        width = getBaseVal(elem, 'width'),
        height = getBaseVal(elem, 'height'),
        arr = [width, height, width, height],
        section,
        i = 0,
        prev = 0,
        sum = 0;

    for (; i < 4; i++) {
      sum += arr[i];

      if (sum >= length) {
        section = length - prev;

        switch (i) {
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
            break;
        }

        return {
          x: x,
          y: y
        };
      }

      prev = sum;
    }
  }

  function getPointAtLengthByLine(elem, length) {
    return getPointAtLine({
      x: getBaseVal(elem, 'x1'),
      y: getBaseVal(elem, 'y1')
    }, {
      x: getBaseVal(elem, 'x2'),
      y: getBaseVal(elem, 'y2')
    }, length);
  }

  function getPointAtLengthByPolyline(elem, length, polygon) {
    var points = elem.points,
        l = points.numberOfItems + (polygon || 0),
        prev = 0,
        sum = 0,
        p1,
        p2,
        i,
        j;

    for (i = 1; i < l; i++) {
      j = i - 1;

      if (polygon && i === l - 1) {
        i = 0;
        j = l - 2;
      }

      p1 = points.getItem(j);
      p2 = points.getItem(i);
      sum += getDistance(p1, p2);

      if (sum >= length) {
        return getPointAtLine(p1, p2, length - prev);
      }

      prev = sum;
    }
  }

  function getPointAtLengthByPolygon(elem, length) {
    return getPointAtLengthByPolyline(elem, length, 1);
  }

  function getPointAtLength(elem, length) {
    if (elem.getPointAtLength) {
      return elem.getPointAtLength(length);
    }

    switch (elem.nodeName.toLowerCase()) {
      case 'rect':
        return getPointAtLengthByRect(elem, length);

      case 'circle':
        return getPointAtLengthByCircle(elem, length);

      case 'ellipse':
        return getPointAtLengthByEllipse(elem, length);

      case 'line':
        return getPointAtLengthByLine(elem, length);

      case 'polyline':
        return getPointAtLengthByPolyline(elem, length);

      case 'polygon':
        return getPointAtLengthByPolygon(elem, length);
    }
  }

  var SVG = {};
  var svgPlugin = {
    id: 'svg',
    priority: 60,
    install: function install(vivid, SPECIAL_VALUE) {
      vivid.geometry = function (elem, percent) {
        elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
        percent = percent || 100;
        return function (property) {
          return {
            el: elem,
            property: property,
            totalLength: getTotalLength(elem) * (percent / 100),
            sign: SPECIAL_VALUE,
            type: SVG
          };
        };
      };

      vivid.setDashoffset = function (id, total, elem) {
        var length = getTotalLength(elem);
        elem.setAttribute('stroke-dasharray', length);
        return length;
      };
    },
    init: function init(tween) {
      var data = tween.pluginData,
          to = tween.to;

      if (!to || to.type !== SVG) {
        return;
      }

      data.svg = {
        geometry: to
      };
      tween.from = 0;
      tween.to = to.totalLength;
      tween.unit = '';
    },
    update: function update(tween, value) {
      var svgData = tween.pluginData.svg,
          p0,
          p1;

      if (!svgData) {
        return;
      }

      value = value[0];
      p0 = getPoint(-1);
      p1 = getPoint(0);

      function getPoint(offset) {
        return getPointAtLength(svgData.geometry.el, value + offset);
      }

      switch (svgData.geometry.property) {
        case 'x':
          return p1.x + 'px';

        case 'y':
          return p1.y + 'px';

        case 'angle':
          return getAngleByLine(p0, p1) + 'deg';
      }
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 处理多个值
  |-------------------------------------------------------------------------------
  |
  | 字符串里含有数值，会将数值拿出来求值，
  | 而后将新的值替换字符串里旧的值并返回替换后的字符串。
  |
  */
  var multiPlugin = {
    id: 'multi',
    priority: 50,
    init: function init(tween) {
      var data = tween.pluginData,
          from,
          to,
          toMatch,
          fromMatch;
      to = tween.to;

      if (typeof to !== 'string' || !(toMatch = to.match(rNums))) {
        return;
      }

      data.multi = {
        strings: to.split(rNums)
      };
      from = tween.from;

      if (typeof from === 'string' && (fromMatch = from.match(rNums))) {
        from = fromMatch;
      } else if (!Array.isArray(from)) {
        from = [tween.from];
      }

      tween.from = from;
      tween.to = toMatch;
    },
    update: function update(tween, value) {
      var multiData = tween.pluginData.multi;

      if (!multiData) {
        return;
      }

      return value.map(function (num, i) {
        return multiData.strings[i] + num;
      }).join('');
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 初始化守卫
  |-------------------------------------------------------------------------------
  |
  */
  var initGuardPlugin = {
    id: 'initGuard',
    priority: 0,
    init: function init(tween, TERMINATE) {
      var to, from;

      if (tween.between) {
        return;
      }

      to = tween.to;

      if (!Array.isArray(to)) {
        to = [to];
      }

      from = tween.from;

      if (!Array.isArray(from)) {
        from = [from];
      }

      tween.between = to.map(function (value, i) {
        return {
          from: Number(from[i]) || 0,
          to: Number(value) || 0,
          round: tween.round
        };
      });
      return TERMINATE;
    },
    update: function update() {}
  };

  vivid.use(updateGuardPlugin);
  vivid.use(cssPlugin);
  vivid.use(colorPlugin);
  vivid.use(relativePlugin);
  vivid.use(svgPlugin);
  vivid.use(multiPlugin);
  vivid.use(initGuardPlugin);

  return vivid;

})));
