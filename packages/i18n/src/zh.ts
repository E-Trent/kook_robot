import { Lang } from "./type";

const zh: Lang = {
  gmsr: {
    help: "`@机器人 指令`获取机器人所有支持的指令",
    intro: "gmsr内容",
    cmd: "指令",
    maintenance: {
      cmd: "维护",
      title: "维护信息: {{title}}",
      notFound: "未查询到维护内容",
      disabled: "别点了别点了",
    },
    role: {
      cmd: "查询",
      notFound: "未查询到角色：{{role}}",
    },
  },
  base: {
    help: "`@机器人 指令`获取机器人所有支持的指令",
    intro: "base内容",
    ping: "ping",
    pong: "pong",
    roll: "roll",
  },
  system: {
    wip: "施工中...",
    "401": "你是谁？",
    "403": "我不认识你!",
    next: "下一条",
    retry: "再找找",
    read_more: "让我看看",
  },
};
export default zh;
