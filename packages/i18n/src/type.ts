export interface Lang {
  gmsr: {
    help: string;
    intro: string;
    cmd: string;
    maintenance: {
      cmd: string;
      title: string;
      notFound: string;
      disabled: string;
    };
    role: {
      cmd: string;
      notFound: string;
    };
  };
  base: {
    help: string;
    intro: string;
    ping: string;
    pong: string;
    roll: string;
  };
  system: {
    "401": string;
    "403": string;
    wip: string;
    next: string;
    retry: string;
    read_more: string;
  };
}
