import { newLifecycleRoot } from '@antman/lifecycle';
import { webserver } from './src/webserver.ts';

if (import.meta.main) {
  const lifecycle = newLifecycleRoot();
  lifecycle.register(webserver);
  await lifecycle.start();
}
