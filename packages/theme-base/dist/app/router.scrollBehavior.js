export default function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else if (to.hash) {
    return {
      selector: decodeURIComponent(to.hash),
    };
  } else {
    return { x: 0, y: 0 };
  }
}
