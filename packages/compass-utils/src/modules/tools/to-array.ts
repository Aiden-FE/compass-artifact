/**
 * @description 将非数组数据包裹为数组,是数组则不处理直接返回
 * @param data
 * @example
 *   toArray('test') // return ['test']
 *   toArray({a: 'a'}) // return [{a: 'a'}]
 *   toArray([1, 2]) // return [1, 2]
 */
export default function toArray <T = unknown>(data: T): T extends unknown[] ? T : T[] {
  // @ts-ignore
  return Array.isArray(data) ? data : [data]
}
