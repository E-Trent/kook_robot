import { Lang } from "./type";

const en: Lang = {
  gmsr: {
    help: "`@me cmd` Get all commands",
    intro: "Content of gmsr",
    cmd: "cmd",
    maintenance: {
      cmd: "maintenance",
      title: "Info: {{title}}",
      notFound: "Not found information about maintenance",
      disabled: "Triggered before",
    },
    role: {
      cmd: "role",
      notFound: "Not found role: {{role}}",
    },
  },
  base: {
    help: "help",
    intro: "Content of base",
    ping: "ping",
    pong: "pong",
    roll: "roll",
  },
  system: {
    wip: "WIP",
    "401": "Who are you？",
    "403": "I don't know you!",
    next: "Next",
    retry: "Try again",
    read_more: "Read more",
  },
};
export default en;
