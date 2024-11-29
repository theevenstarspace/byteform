const BASE_URL = 'https://github.com/theevenstarspace/byteform/blob/main/';

export const getDefinedInUrl = (relativePath: string, startLine?: number, endLine?: number): string => {
  let url = BASE_URL + (relativePath[0] === '/' ? relativePath.slice(1) : relativePath);
  if (startLine !== undefined) {
    url += `#L${startLine}`;
    if (endLine !== undefined) {
      url += `-L${endLine}`;
    }
  }
  return url;
};