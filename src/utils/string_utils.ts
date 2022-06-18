export const isEmpty = (string: string | null) => {
  const regExp = new RegExp(/^(\s+)?$/);

  if (string === null) {
    return true;
  }

  return regExp.test(string);
}