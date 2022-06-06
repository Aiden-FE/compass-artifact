import {convertToCSSData, createStyleSheet} from "../tools";
import {ThemeConstructor, ThemeVariables} from "./_theme.type";

/**
 * @description 主题管理
 * @example
 *   const theme = new Theme({
 *     selector: 'body', // 'body' | '#id' | '.class'
 *     // 该项内的变量所有主题均会继承它或覆盖它
 *     baseThemeVariables: {
 *       "--primary": "#00C0C9",
 *       "background": "var(--page_background, #fff)", // 不推荐; 可以直接为选择器应用样式
 *     }
 *   })
 *   theme
 *     // 注册主题
 *     .registerTheme('light', {
 *       "--page_background": "#F5F5F5"
 *     })
 *     .registerTheme('dark', {
 *       "--page_background": "#1B1B2B"
 *     })
 *     // 切换主题
 *     .toggleTheme('light')
 *   // 获取当前主题 return 'light'
 *   const themeName = theme.getCurrentTheme()
 *   // 获取当前主题配置
 *   // return { "--primary": "#00C0C9", "--page_background": "#F5F5F5" }
 *   theme.getDataByTheme(themeName)
 *   // 重置主题
 *   theme.resetTheme()
 */
export default class Theme {
  /** 主题注册表 */
  private registry: Map<string, ThemeVariables> = new Map()
  /** 当前主题模式 */
  private theme?: string
  /** 主题挂载的选择器 */
  private readonly selector: string
  /** 会被各主题继承的公共主题变量 */
  private readonly themeVariables: ThemeVariables | null = null
  /** 样式表 */
  private styleSheet = createStyleSheet()
  
  constructor(opts: ThemeConstructor) {
    this.selector = opts.selector
    if (opts.baseThemeVariables) {
      this.themeVariables = opts.baseThemeVariables
      this.styleSheet.insertRule(`${this.selector} {${convertToCSSData(opts.baseThemeVariables)}}`);
    }
  }
  
  /**
   * @description 重置主题
   */
  public resetTheme () {
    this.setTheme(undefined)
  }
  
  /**
   * @description 注册主题
   * @param themeName 主题名称
   * @param themeData 主题配置数据
   */
  public registerTheme (themeName: string, themeData: ThemeVariables): Theme {
    this.registry.set(themeName, themeData)
    const cssVars = Object.assign({}, this.themeVariables, themeData)
    this.styleSheet.insertRule(
      `${this.selector}[data-theme="${themeName}"] {${convertToCSSData(cssVars)}}`)
    return this
  }
  
  /**
   * @description 切换已注册的主题
   * @param theme
   */
  public toggleTheme (theme: string) {
    if (!this.validateHasTheme(theme)) {
      throw new Error(`[Theme]: ${theme} 是尚未注册的主题`)
    }
    this.setTheme(theme)
  }
  
  /**
   * @description 获取当前主题
   */
  public getCurrentTheme () {
    return this.theme
  }
  
  /**
   * @description 根据主题获取主题数据
   * @param theme
   */
  public getDataByTheme (theme: string) {
    if (!this.validateHasTheme(theme)) {
      return undefined
    }
    return Object.assign({}, this.themeVariables, this.registry.get(theme))
  }
  
  /**
   * @description 设置主题
   * @param theme
   * @private
   */
  private setTheme (theme?: string) {
    const element = document.querySelector(this.selector)
    if (!element) {
      throw new Error(`[Theme]: ${this.selector} 未找到对应选择器元素`)
    }
    if (!theme) {
      element.removeAttribute('data-theme')
      this.theme = undefined
      return
    }
    element.setAttribute('data-theme', theme)
    this.theme = theme
  }
  
  /**
   * @description 验证主题有效性
   * @param themeName 主题名
   * @private
   */
  private validateHasTheme (themeName: string) {
    return this.registry.size > 0 && this.registry.has(themeName);
  }
}
