import { computed } from "@vue/composition-api";
import { ApplicationVueContext } from "../";

/**
 * @alpha
 */
export const useDomains = ({ domainsRouting }: ApplicationVueContext) => {
  const availableLanguages = computed(() => []);
  const getDomains = computed(() => domainsRouting.availableDomains);
  const availableDomains = computed(() =>
    Object.keys(getDomains.value).filter((domain) => domain !== "/")
  );
  const pattern = "(" + availableDomains.value.join(")|(") + ")";
  const trimDomain = (path: string) =>
    `/${path}`.replace(new RegExp(pattern, "g"), "").replace("/^/", "");
  const findDomainInURL = (url: string) => new RegExp(pattern, "g").test(url);
  const getConfigForDomain = (domain: string) => getDomains.value?.[domain];
  const changeDomain = async (domainId: string) => {
    //   console.warn(domainId);
    // if (localeCode === i18n.locale) return;
    // if (localeCode === i18n.fallbackLocale) {
    //   router.push(rootContext.$route.fullPath.replace(/^\/[^\/]+/, ""));
    // } else {
    //   router.push(`/${localeCode}${rootContext.$route.fullPath}`);
    // }
  };

  return {
    availableDomains,
    availableLanguages,
    changeDomain,
    currentDomain: domainsRouting.currentDomain,
    trimDomain,
    findDomainInURL,
    getConfigForDomain,
  };
};
