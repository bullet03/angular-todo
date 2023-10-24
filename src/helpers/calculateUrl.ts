export const calculateUrlWithParams = (url: string, filterOptions: {[key: string]: unknown}) => {
  const filterOptionsKeys = Object.keys(filterOptions);
  const isFilterOptionsEmpty = filterOptionsKeys.length;
  let resultUrl: string = `${url}?`;

  if (isFilterOptionsEmpty === 0) return url;

  for (let i = 0; i < filterOptionsKeys.length; i++) {
    const currentKey = filterOptionsKeys[i];
    const currentValue = filterOptions[currentKey];

    if (typeof filterOptionsKeys[i + 1] === 'undefined') {
      resultUrl = `${resultUrl}${currentKey}=${currentValue}`
    } else {
      resultUrl = `${resultUrl}${currentKey}=${currentValue}&`
    }
  }

  return resultUrl;
}
