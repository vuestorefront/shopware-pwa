const { build } = require("gluegun");

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  const isNode17 = process.versions.node.startsWith("17");
  if (isNode17) {
    console.warn(`
    WARNING: 
    You are using node v17. Therefore additional parameter is required to run Shopware PWA correctly.
    Please add --openssl-legacy-provider option using environment variables before running a project:

    NODE_OPTIONS=--openssl-legacy-provider
    It can be added in .env file or globally in the environment the project is running.

    It's recommended to use LTS (v14 or v16) of node in order to avoid the issue.
    
    read more: https://github.com/vuestorefront/shopware-pwa/issues/1778
    `);
  }

  // create a CLI runtime
  const cli = build()
    .brand("shopware-pwa")
    .src(__dirname)
    .plugins("./node_modules", { matching: "shopware-pwa-*", hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create();
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching'])
  // and run it
  const toolbox = await cli.run(argv);

  // send it back (for testing, mostly)
  return toolbox;
}

module.exports = { run };
