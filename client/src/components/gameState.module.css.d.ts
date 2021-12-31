declare namespace GameStateModuleCssNamespace {
  export interface IGameStateModuleCss {
    button: string;
    display: string;
    main: string;
  }
}

declare const GameStateModuleCssModule: GameStateModuleCssNamespace.IGameStateModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GameStateModuleCssNamespace.IGameStateModuleCss;
};

export = GameStateModuleCssModule;
