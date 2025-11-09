import { serverMsgCodec, ServerMessage, textBinaryCodec } from 'codecs';

const stdout = Deno.stdout;

const sendMessage = (msg: ServerMessage) => stdout.write(encode(msg));

const encode = (msg: ServerMessage) =>
  textBinaryCodec.encode(serverMsgCodec.encode(msg) + '\n');

export const sendTwitchCodeGranted = (code: string) =>
  sendMessage({
    k: 0,
    code,
  });
