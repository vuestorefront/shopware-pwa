import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "sync-admin",
  description: `Wraps all backend-related synchronisations that need backend credentials like domains, plugins into one command.
  Command invokes execution of internal CLI commands that need admin user and password subsequentially.

  In order to run a specific command, or commands - use --command option, like
  shopware-pwa sync-admin --ci --username admin --password shopware --command domains --command plugins
  
  The command above will run commands plugins and domains internally, and you will be asked for credentials only once (if there is no --ci option).
  `,
  run: async (toolbox: GluegunToolbox) => {
    const inputParameters: {
      username?: string;
      password?: string;
      ci?: boolean;
      command?: string[] | string;
    } = toolbox.inputParameters;
    Object.assign(inputParameters, toolbox.parameters.options);

    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      toolbox.print.info(`
[CLI > sync-admin] Synchronize data between admin API & Shopware PWA`);

      const shopwareUsernameQuestion = !inputParameters.username && {
        type: "input",
        name: "username",
        message: "Shopware admin username:",
        initial: process.env.ADMIN_USER,
        footer: process.env.ADMIN_USER && "username is taken from .env",
      };

      const shopwarePasswordQuestion = !inputParameters.password && {
        type: "password",
        name: "password",
        message: "Shopware admin password:",
        initial: process.env.ADMIN_PASSWORD,
        footer: process.env.ADMIN_PASSWORD && "password from .env is hidden",
      };

      const answers = await toolbox.prompt.ask([
        shopwareUsernameQuestion,
        shopwarePasswordQuestion,
      ]);

      Object.assign(inputParameters, answers);
    }

    const { username, password, ci, command } = inputParameters;

    if ((!username || !password) && !toolbox.isDefaultDemoData()) {
      toolbox.print.error(
        "[CLI > sync-admin] Please provide your admin credentials using the --username and --password options or answering the questions."
      );
      return;
    }

    let commands = (Array.isArray(command) && command) || [command];

    if (!Array.isArray(commands)) {
      toolbox.print.info(
        "[CLI > sync-admin] You didn't provide any command to run."
      );
      return;
    }

    let promises = [];
    for (const commandName of commands) {
      toolbox.print.info(`${commandName} command queued to run.`);
      promises.push(
        await toolbox.runtime.run(commandName, {
          username,
          password,
          ci,
        })
      );
    }

    Promise.all(promises).catch((commandName) => {
      console.error(
        `${commandName} command had been executed but failed. Try to run the command separately.`
      );
    });
  },
};
