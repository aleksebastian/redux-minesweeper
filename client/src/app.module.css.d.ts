declare namespace AppModuleCssNamespace {
  export interface IAppModuleCss {
    board: string;
    header: string;
    hidden: string;
    main: string;
    marked: string;
    mine: string;
    number: string;
  }
}

declare const AppModuleCssModule: AppModuleCssNamespace.IAppModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppModuleCssNamespace.IAppModuleCss;
};

export = AppModuleCssModule;
