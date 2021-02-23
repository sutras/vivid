/*
|-------------------------------------------------------------------------------
| 初始化守卫
|-------------------------------------------------------------------------------
|
*/
export default {
  id: 'initGuard',
  priority: 0,
  init(tween, TERMINATE) {
    let to,
      from;

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

    tween.between = to.map((value, i) => ({
      from: Number(from[i]) || 0,
      to: Number(value) || 0,
      round: tween.round
    }));

    return TERMINATE;
  },
  update() { }
};