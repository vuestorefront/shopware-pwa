import axios from "axios";

export async function createVersionMenuPosition() {
  const hostname = location.hostname;

  const cachedVersions = JSON.parse(
    localStorage.getItem("docVersions") || "[]"
  );
  let apiVersions = null;

  try {
    const compatibilityResponse = await axios.get(
      `https://raw.githubusercontent.com/vuestorefront/shopware-pwa/master/packages/commons/compatibility.json`
    );
    apiVersions = compatibilityResponse.data.docVersions;
    localStorage.setItem("docVersions", JSON.stringify(apiVersions || []));
  } catch (error) {
    console.error("[DOC versions] Cannot fetch API versions.", error);
  }
  const versions = apiVersions || cachedVersions;
  let currentVersion = versions?.find((v) => v.link.includes(hostname));

  if (!currentVersion) {
    currentVersion = {
      text: "Other versions",
    };
  }
  const children = versions.filter((v) => v.text !== currentVersion.text);
  currentVersion.items = children;
  return [currentVersion];
}
