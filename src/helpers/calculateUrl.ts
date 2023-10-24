export const calculateUrlWithParams = (url: string, filterOptions: {[key: string]: unknown}) => {
  const filterOptionsKeys = Object.keys(filterOptions);
  const isFilterOptionsEmpty = filterOptionsKeys.length;

  if (isFilterOptionsEmpty === 0) return url;

  let resultUrl: string = `${url}?`;

  for (let i = 0; i < filterOptionsKeys.length; i++) {
    const currentKey = filterOptionsKeys[i];
    if (typeof filterOptionsKeys[i + 1] === 'undefined') {
      resultUrl = `${resultUrl}${currentKey}=${filterOptions[currentKey]}`
    } else {
      resultUrl = `${resultUrl}${currentKey}=${filterOptions[currentKey]}&`
    }
  }

  return resultUrl;
}
