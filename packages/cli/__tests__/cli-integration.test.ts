const { system, filesystem } = require("gluegun");

const src = filesystem.path(__dirname, "..");

const cli = async (cmd) =>
  system.run("node " + filesystem.path(src, "bin", "shopware-pwa") + ` ${cmd}`);

test("outputs version", async () => {
  const { version } = require("../package.json");
  const output = await cli("--version");
  expect(output).toContain(version);
});

test("outputs help", async () => {
  const { version } = require("../package.json");
  const output = await cli("--help");
  expect(output).toContain(version);
});
