export const toggleStringInArray = (arr: string[], str: string): string[] => {
  if (arr.includes(str)) {
    return arr.filter((item) => item !== str)
  } else {
    return [...arr, str]
  }
}
