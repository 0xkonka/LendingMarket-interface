import { Buffer } from 'buffer';
import process from 'process';

// https://github.com/cyco130/esbuild-plugin-polyfill-node the globals option
// should have handled this but does not in production
window.Buffer = Buffer;
window.process = process;
