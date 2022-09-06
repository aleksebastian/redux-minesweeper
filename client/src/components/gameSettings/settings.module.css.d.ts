declare namespace SettingsModuleCssNamespace {
  export interface ISettingsModuleCss {
    btn: string;
    closeMenu: string;
    container: string;
    footer: string;
    header: string;
    item: string;
    itemDetails: string;
    menu: string;
  }
}

declare const SettingsModuleCssModule: SettingsModuleCssNamespace.ISettingsModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsModuleCssNamespace.ISettingsModuleCss;
};

export = SettingsModuleCssModule;
