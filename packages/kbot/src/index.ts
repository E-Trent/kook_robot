import { KBotify } from "kbotify";
import { z } from "zod";

const envSchema = z.object({
  KHL_TOKEN: z.string().nonempty("Khl token missing"),
  KHL_PORT: z.string().regex(/^\d+$/).transform(Number),
  KHL_VERIFY: z.string().nonempty("Khl verify Missing"),
  KHL_KEY: z.string().nonempty("Khl key missing"),
});
const env = envSchema.parse(process.env);
const init = () =>
  new KBotify({
    mode: "websocket",
    token: env.KHL_TOKEN,
    port: env.KHL_PORT,
    verifyToken: env.KHL_VERIFY,
    key: env.KHL_KEY,
    ignoreDecryptError: true,
  });

export default init;
export * from "./commands/gmsrMenu";
export * from "./commands/baseMenu";
export * from "./helper/uplaod";
export * from "KBotify";
