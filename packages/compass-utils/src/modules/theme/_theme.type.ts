export interface ThemeConstructor {
  /** 主题挂载的选择器 */
  selector: string
  /** 会被各主题继承的公共主题变量 */
  baseThemeVariables?: ThemeVariables
}

/** 主题配置数据 */
export type ThemeVariables = Record<string, string | number>;
