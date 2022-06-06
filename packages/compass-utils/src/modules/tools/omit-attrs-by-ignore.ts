import { omitBy } from 'lodash-es';

/**
 * @description 根据ignore忽略目标对象内匹配的属性
 * @param dataObj
 * @param ignoreValues default = [undefined, null, ''],采用===严格模式
 * @example
 *   omitAttrsByIgnore(
 *     {
 *       a: 'a',
 *       b: undefined,
 *       c: null,
 *       d: '',
 *     }
 *   ) // return { a: 'a' }
 *   omitAttrsByIgnore(
 *     {
 *       a: 'a',
 *       b: undefined,
 *       c: null,
 *       d: '',
 *     },
 *     ['a']
 *   ) // return { b: undefined, c: null, d: '', }
 */
export default function omitAttrsByIgnore(dataObj: object, ignoreValues: unknown[] = [undefined, null, '']) {
  return omitBy(dataObj, (val) => ignoreValues.includes(val));
}
