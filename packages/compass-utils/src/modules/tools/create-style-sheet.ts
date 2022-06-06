/**
 * @name 创建 style sheet 对象
 * @return {CSSStyleSheet}
 */
export default function createStyleSheet (context: Document = document) {
  const head = context.head || context.getElementsByTagName('head')[0]
  const style = context.createElement('style')
  head.appendChild(style)
  if (!style.sheet) throw new Error('不支持StyleSheet的环境')
  return style.sheet
}
