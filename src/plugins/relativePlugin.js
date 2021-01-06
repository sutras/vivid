/*
|-------------------------------------------------------------------------------
| 处理相对值
|-------------------------------------------------------------------------------
|
*/

function getRelativeValue( from, to, operator ) {
    if ( !operator ) {
        return to;
    }
    switch ( operator[0] ) {
        case '+': return from + to;
        case '-': return from - to;
        case '*': return from * to;
        case '/': return from / to;
        case '%': return from / to;
    }
}

export default {
    id: 'relative',
    priority: 70,
    init( tween, TERMINATE ) {
        let parts,
            from;

        if ( !tween.operator ) {
            return;
        }

        from = tween.from;
        if ( Array.isArray( from ) ) {
            from = from[0];
        }

        if ( typeof from !== 'number' ) {
            from = Number( from ) || 0;
        }

        tween.to = getRelativeValue( from, parseFloat( tween.to ), tween.operator );

        tween.between = [{
            from,
            to: tween.to,
            round: tween.round
        }];

        return TERMINATE;
    },
    update() {}
};