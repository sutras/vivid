import vivid from './core';

import updateGuardPlugin from './plugins/updateGuardPlugin';
import cssPlugin from './plugins/cssPlugin';
import colorPlugin from './plugins/colorPlugin';
import relativePlugin from './plugins/relativePlugin';
import svgPlugin from './plugins/svgPlugin';
import multiPlugin from './plugins/multiPlugin';
import initGuardPlugin from './plugins/initGuardPlugin';


vivid.use( updateGuardPlugin );
vivid.use( cssPlugin );
vivid.use( colorPlugin );
vivid.use( relativePlugin );
vivid.use( svgPlugin );
vivid.use( multiPlugin );
vivid.use( initGuardPlugin );

export default vivid;