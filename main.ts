import { Lifecycle } from '@antman/lifecycle';
import { webserver } from './src/webserver.ts';

if (import.meta.main) {
  const lifecycle = new Lifecycle();
  lifecycle.register(webserver);
  await lifecycle.start();
}
