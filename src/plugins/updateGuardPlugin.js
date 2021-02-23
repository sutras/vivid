/*
|-------------------------------------------------------------------------------
| 更新守卫
|-------------------------------------------------------------------------------
|
*/

export default {
  id: 'updateGuard',
  priority: 100,
  init() { },
  update(tween, value, TERMINATE) {
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