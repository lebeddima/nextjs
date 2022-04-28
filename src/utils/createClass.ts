export const createClass = <T>(
  obj: T,
  s: { [key: string]: string }
): (string | number | symbol)[] => {
  const keys = Object.keys(obj) as Array<keyof typeof obj>
  return keys.map((item) => s[`${item}_${obj[item]}`])
}
