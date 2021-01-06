import animate from './core';

import updateGuardPlugin from './plugins/updateGuardPlugin';
import cssPlugin from './plugins/cssPlugin';
import colorPlugin from './plugins/colorPlugin';
import relativePlugin from './plugins/relativePlugin';
import svgPlugin from './plugins/svgPlugin';
import multiPlugin from './plugins/multiPlugin';
import initGuardPlugin from './plugins/initGuardPlugin';


animate.use( updateGuardPlugin );
animate.use( cssPlugin );
animate.use( colorPlugin );
animate.use( relativePlugin );
animate.use( svgPlugin );
animate.use( multiPlugin );
animate.use( initGuardPlugin );

export default animate;