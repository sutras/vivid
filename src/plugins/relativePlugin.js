function getRelativeValue( from, to, operator ) {
    if ( !operator ) {
        return to;
    }
    switch ( operator[0] ) {
        case '+': return from + to;
        case '-': return from - to;
        case '*': return from * to;
        case '/': return from / to;
    }
}

export default {
    id: 'relative',
    init: function( tween ) {
        let between,
            from;

        if ( !tween.singleValue || !tween.operator ) {
            return;
        }

        between = tween.between[0];
        from = between.from;
        tween.operator

        if ( typeof from !== 'number' ) {
            from = Number( from ) || 0;
        }

        return getRelativeValue( from, between.to, tween.operator );
    },
    update: function() {

    }
};