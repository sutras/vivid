/*
|-------------------------------------------------------------------------------
| 处理多个值
|-------------------------------------------------------------------------------
|
| 字符串里含有数值，会将数值拿出来求值，
| 而后将新的值替换字符串里旧的值并返回替换后的字符串。
|
*/
import { rNums } from '../util';

export default {
    id: 'multi',
    priority: 50,
    init( tween ) {
        let data = tween.pluginData,
            from, to,
            toMatch,
            fromMatch;

        to = tween.to;
        if ( typeof to !== 'string' ||
             !( toMatch = to.match( rNums ) ) ) {
            return;
        }

        data.multi = {
            strings: to.split( rNums )
        };

        from = tween.from;
        if ( typeof from === 'string' && ( fromMatch = from.match( rNums ) ) ) {
            from = fromMatch;
        } else if ( !Array.isArray( from ) ) {
            from = [tween.from];
        }
        tween.from = from;
        tween.to = toMatch;
    },
    update( tween, value ) {
        const multiData = tween.pluginData.multi;

        if ( !multiData ) {
            return;
        }

        return value.map( (num, i) => multiData.strings[i] + num ).join('');
    }
};