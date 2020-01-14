import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "init",
  alias: ["i"],
  run: async (toolbox: GluegunToolbox) => {
    const {
      // parameters,
      // template: { generate },
      system: { run },
      print: { info, spin },
      filesystem: { exists },
      generateNuxtProject
    } = toolbox;

    await generateNuxtProject();
    // const name = parameters.first; // await generate({
    //   template: 'model.ts.ejs',
    //   target: `models/${name}-model.ts`,
    //   props: { name },
    // })

    // info(`Generated file at models/${name}-model.ts`);
    info(`Generated Shopware PWA`);
  }
};
