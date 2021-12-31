declare namespace CellModuleCssNamespace {
  export interface ICellModuleCss {
    cell: string;
  }
}

declare const CellModuleCssModule: CellModuleCssNamespace.ICellModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CellModuleCssNamespace.ICellModuleCss;
};

export = CellModuleCssModule;
