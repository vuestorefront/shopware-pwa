const apiDefaults = <%= JSON.stringify(options.apiDefaults) %>;

export default async (context, inject) => {
  inject("shopwareDefaults", apiDefaults);
};
