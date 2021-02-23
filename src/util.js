/*
|-------------------------------------------------------------------------------
| 工具函数
|-------------------------------------------------------------------------------
|
*/

export const rNum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;
export const rUnit = /%|px|em|ex|ch|rem|vw|vh|vmin|vmax|pc|pt|in|cm|mm|deg|rad|turn/;
export const rCssNumVal = new RegExp('^([+\\-*/%]=|)(' + rNum.source + ')(' + rUnit.source + '|)$', 'i');
export const rNums = new RegExp(rNum.source, 'g');

const toString = Object.prototype.toString;

export function assignObjectProp(target) {
  let i = 1,
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

export function copyObject(target) {
  let i, obj = {};
  for (i in target) {
    obj[i] = target[i];
  }
  return obj;
}

export function overrideObject(target) {
  let i = 1,
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

export function assignObject(target) {
  let i = 1,
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

export function isFunction(target) {
  return typeof target === 'function';
}

export function isPlainObject(target) {
  return toString.call(target) === '[object Object]';
}

export function isEmptyObject(target) {
  let i;
  for (i in target) {
    break;
  }

  return i === void 0;
}


export function isArrayLike(target) {
  return target != null &&
    typeof target === 'object' &&
    isFinite(target.length) &&
    target.length >= 0 &&
    target.length === Math.floor(target.length) &&
    target.length < 4294967296;
}

export function isSvg(target) {
  return typeof SVGElement !== 'undefined' && target instanceof SVGElement;
}


// 扁平化数组
export function flattenArray(target, depth) {
  let result = [],
    i, l, item;

  depth = depth || 1;

  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];
    result = result.concat(Array.isArray(item) && depth > 1 ? flattenArray(item, depth - 1) : item);
  }

  return result;
}

// 数组去重
export function uniqueArray(target) {
  let result = [],
    i, l, item;

  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];
    if (target.indexOf(item) === i) {
      result.push(item);
    }
  }
  return result;
}

export function arrayPluck(target, key) {
  let result = [], prop, i = 0, l = target.length;

  for (; i < l; i++) {
    prop = target[i][key];
    if (prop != null) {
      result.push(prop);
    }
  }

  return result;
}

export function sortBy(target, fn, scope) {
  let array = target.map(function (item, index) {
    return {
      el: item,
      ret: fn.call(scope, item, index)
    };
  }).sort(function (left, right) {
    let a = left.ret, b = right.ret;
    // 字符串不能相减，但可以比较大小，显式返回大于0、小于0、0等于就可以满足sort函数的要求
    return a < b ? -1 : a > b ? 1 : 0;
  });
  return arrayPluck(array, 'el');
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}