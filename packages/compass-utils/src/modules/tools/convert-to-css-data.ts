/**
 * @description 数据对象转换为css规则字符串
 * @param data
 * @return {string}
 */
export default function convertToCSSData(data: Record<string, string | number>): string {
  return Object
    .keys(data)
    .map((key) => `${key}: ${data[key]}`)
    .join(';');
}
