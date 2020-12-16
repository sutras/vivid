import animate from './core';

import cssPlugin from './plugins/cssPlugin';
import colorPlugin from './plugins/colorPlugin';
import relativePlugin from './plugins/relativePlugin';
import svgPlugin from './plugins/svgPlugin';


animate.use( svgPlugin );
animate.use( colorPlugin );
animate.use( relativePlugin );
animate.use( cssPlugin );

export default animate;