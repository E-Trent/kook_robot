import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";
import { Card } from "kbotify/dist/core/card";

export class GmsrMenu extends AppCommand {
  code = "gmsr";
  trigger = "gmsr";
  help = $t("gmsr.help");
  intro = $t("gmsr.intro");
  hitMap: Record<string, AppFunc> = {
    [$t("gmsr.cmd")]: async (session) =>
      session.sendCardTemp(await this.api.getCard("gmsr-help-card")),
    [$t("gmsr.role.cmd")]: async (session) => {
      const role = session.args[1];
      const card = await this.api.getRole(role);
      return card
        ? session.sendCardTemp(card)
        : session.quoteTemp($t("gmsr.role.notFound", { role }));
    },
    [$t("gmsr.maintenance.disabled")]: (session) => {
      return session.quoteTemp($t("gmsr.maintenance.disabled"));
    },
    [$t("gmsr.maintenance.cmd")]: async (session) => {
      const option = {
        after: "",
        page: 1,
      };
      try {
        const _option = JSON.parse(session.args[1]);
        option.after = _option.after || "";
        option.page = _option.page || 1;
      } catch (e) {}
      const fallback = (_option: { after: string; page: number }) =>
        this.api.getMaintenance(_option, fallback);
      const card = await this.api.getMaintenance(option, fallback);
      return session.sendCardTemp(card);
    },
  };

  constructor(
    public api: {
      getCard: (slug: string) => Promise<Card>;
      getMaintenance: (
        option: { after: string; page: number },
        fallback: (option: { after: string; page: number }) => Promise<Card>
      ) => Promise<Card>;
      getRole: (name: string) => Promise<Card | undefined>;
    }
  ) {
    super();
  }

  func: AppFunc = async (session) => this.hitMap[session.args[0]]?.(session);
}
