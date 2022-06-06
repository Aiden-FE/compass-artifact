/**
 * @description 将数组内的多个类型转为联合类型
 * @example
 *   const a = ['1','2',6] // type: (string | number)[]
 *   type b = (string | number)[]
 *   type c = ArrayConvertToUnionType<typeof a> // type: string | number
 *   type d = ArrayConvertToUnionType<b> // type: string | number
 */
export type ArrayConvertToUnionType<T> = T extends (infer A)[] ? A : never

/**
 * @description 递归设置所有属性为可选类型
 * @example
 *   type A = {
 *     a: {
 *       a1: string,
 *       a2?: number
 *     },
 *     b?: {
 *       b1: string,
 *       b2?: number
 *     }
 *   }
 *   type B = DeepPartial<A>
 *   // Equal
 *   type C ={
 *     a?: {
 *       a1?: string,
 *       a2?: number
 *     },
 *     b?: {
 *       b1?: string,
 *       b2?: number
 *     }
 *   }
 */
export type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object
    ? DeepPartial<T[U]>
    : T[U]
}
