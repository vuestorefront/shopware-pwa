import axios from "axios";

export async function createVersionMenuPosition() {
  const hostname = location.hostname;

  const compatibilityResponse = await axios.get(
    `https://raw.githubusercontent.com/vuestorefront/shopware-pwa/master/compatibility.json`
  );
  const versions = compatibilityResponse.data?.docVersions;
  if (versions) {
    let currentVersion = versions.find((v) => v.link.includes(hostname));
    if (!currentVersion) {
      currentVersion = versions.find((v) => v.text === "current");
    }
    const children = versions.filter((v) => v.text !== currentVersion.text);
    currentVersion.items = children;
    return [currentVersion];
  }

  return [];
}
