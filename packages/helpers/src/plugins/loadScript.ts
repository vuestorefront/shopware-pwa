/**
 * Helper for plugins to load external scripts for plugins
 *
 * @beta
 *
 */
// istanbul ignore next
export function loadScript(src: string): Promise<void> {
  // Credits: https://github.com/tserkov/vue-plugin-load-script
  // we'll use that lib here directly when it will provide methods exporting
  return new Promise(function (resolve: () => void, reject: () => void) {
    if (!document || document.querySelector('script[src="' + src + '"]')) {
      resolve();
      return;
    }

    const el = document.createElement("script");

    el.type = "text/javascript";
    el.async = true;
    el.src = src;

    el.addEventListener("load", resolve);
    el.addEventListener("error", reject);
    el.addEventListener("abort", reject);

    document.head.appendChild(el);
  });
}
