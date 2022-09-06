declare namespace ToggleSwitchModuleCssNamespace {
  export interface IToggleSwitchModuleCss {
    checkbox: string;
    container: string;
    inner: string;
    label: string;
    labelText: string;
    switch: string;
    toggleSwitch: string;
  }
}

declare const ToggleSwitchModuleCssModule: ToggleSwitchModuleCssNamespace.IToggleSwitchModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToggleSwitchModuleCssNamespace.IToggleSwitchModuleCss;
};

export = ToggleSwitchModuleCssModule;
