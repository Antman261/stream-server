import { expect } from '@std/expect';
import { makeSimTest } from '@antman/sim-test';

const withSim = makeSimTest({
  clients: [],
  servers: [{ entryPath: './main.ts' }],
});

Deno.test(
  'Emits OAuth code to stdout when receives grant code',
  withSim(async ({ simCtx }) => {
    const [server] = simCtx.serverInstances;
    await server.getText('/auth/twitch/codegrant?code=1a2b3c'); // todo: simplify getText vs get
    const logs = server.app.inspectLogs();
    console.log(logs); // todo: separate err & out
    // todo: server.wroteStdoutMatching()
    expect(logs.join('')).toContain('"code":"1a2b3c"');
  })
);
