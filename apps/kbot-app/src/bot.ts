import kbotInit, { baseMenu, KBotify } from "kbot";
import { gmsrMenu } from "./commands/gmsr";
import { $t } from "i18n";
import { logger } from "./logger";

export const bot: KBotify = kbotInit();
bot.message.on("text", async (msg) => {
  logger.pushMessage(msg);
  if (
    msg.mention.user.length >= 1 &&
    msg.mention.user.includes(msg.client.userId)
  ) {
    const args = msg.content.split(" ").slice(1);
    let hit = false;
    for (const menu of [baseMenu, gmsrMenu]) {
      if (Object.keys(menu.hitMap).includes(args[0])) {
        hit = true;
        await bot.execute(menu.code, args, msg);
      }
    }
    if (!hit) {
      await bot.execute(baseMenu.code, args, msg);
    }
  }
});

const checkMaintenanceTargetMsgId = new Map<string, boolean>();
bot.message.on("buttonEvent", async (msg) => {
  logger.pushEvent(msg);
  const { targetMsgId, content } = msg;
  try {
    const returnValue = JSON.parse(content);
    if (returnValue.type === "maintenance") {
      if (checkMaintenanceTargetMsgId.has(targetMsgId)) {
        await bot.execute(
          gmsrMenu.code,
          [$t("gmsr.maintenance.disabled")],
          msg
        );
        return;
      }
      checkMaintenanceTargetMsgId.set(targetMsgId, true);

      await bot.execute(
        gmsrMenu.code,
        [$t("gmsr.maintenance.cmd"), JSON.stringify(returnValue.last)],
        msg
      );
    }
  } catch (e) {
    return;
  }
});
bot.addCommands(baseMenu);
bot.addCommands(gmsrMenu);
