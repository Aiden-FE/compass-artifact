/** 主题配置数据 */
export type ThemeVariables = Record<string, string | number>;

export type TMToggleCallback = (themeName: string | undefined, themeData: ThemeVariables | null) => void;

export interface TMConstructor {
  /**
   * @description 主题变量挂载的根节点
   * @default 'html'
   * @example
   *   '#id', '.class', document.querySelector('.anyElement')
   */
  root?: string | Element | null;
  /** 会被各主题继承的公共主题变量 */
  baseVariables?: ThemeVariables;
  hooks?: {
    /** 切换主题后触发, 当置为空,不应用任何主题时传入的是 (undefined, null) => void */
    afterToggle?: TMToggleCallback;
  };
}

export type TMThemeConfig = {
  index: number;
  data: ThemeVariables;
};
