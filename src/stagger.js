/*
|-------------------------------------------------------------------------------
| 交错动画
|-------------------------------------------------------------------------------
|
*/
import { assignObjectProp, isFunction } from './util';
import easing from './easing';

const staggerOptions = {
  start: 0,
  from: 0,
  direction: 'normal',
  easing: null,
  grid: null
};

export default function stagger(val, options) {
  options = assignObjectProp({}, staggerOptions, options);

  let direction = options.direction,
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
    let i,
      fromX, fromY,
      toX, toY,
      distanceX, distanceY,
      value,
      spacing;

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
        values = values.map(val => tween(val / maxValue) * maxValue);
      }
      if (direction === 'reverse') {
        values = values.map(val => axis ? -val : Math.abs(maxValue - val));
      }
    }

    spacing = isRange ? (val2 - val1) / maxValue : val1;
    if (spacing === Infinity) {
      spacing = 0;
    }
    return start + (spacing * (Math.round(values[index] * 100) / 100));
  };
}

