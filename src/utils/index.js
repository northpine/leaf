export const openInNewTab = (url) => () => {
  window.open(url, "_blank")
}

export const shortenUrl = (urlStr) => {
  const url = new URL(urlStr);
  return `${url.protocol}//${url.hostname}`;
}