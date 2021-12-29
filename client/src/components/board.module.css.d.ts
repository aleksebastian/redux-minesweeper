declare namespace BoardModuleCssNamespace {
  export interface IBoardModuleCss {
    board: string;
  }
}

declare const BoardModuleCssModule: BoardModuleCssNamespace.IBoardModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BoardModuleCssNamespace.IBoardModuleCss;
};

export = BoardModuleCssModule;
