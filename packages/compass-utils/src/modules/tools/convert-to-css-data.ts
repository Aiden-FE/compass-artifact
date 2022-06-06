/**
 * @description 数据对象转换为css规则字符串
 * @param data
 * @return {string}
 */
export default function convertToCSSData (data: Record<string, string | number>): string {
  const result: string[] = []
  for (const key in data) {
    const value = data[key]
    result.push(`${key}: ${value}`)
  }
  return result.join(';')
}
