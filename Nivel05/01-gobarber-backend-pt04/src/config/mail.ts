interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
      email: "wallbergmirandamorais@gmail.com",
      name: "Wall Berg Morais"
    }
  }
} as IMailConfig;
