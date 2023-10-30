export interface Themes {
  [key: string]: {
    // NEW SYSTEM
    common: {
      white: {
        hex: string;
        rgb: number[];
      };
    };
    palette: {
      token1: {
        hex: string;
        rgb: number[];
      };
      token2: {
        hex: string;
        rgb: number[];
      };
      token3: {
        hex: string;
        rgb: number[];
      };
      token4: {
        hex: string;
        rgb: number[];
      };
    };
    text2: {
      default: {
        hex: string;
        rgb: number[];
      };
      subdued: {
        hex: string;
        rgb: number[];
      };
    };
    accent: {
      default: {
        hex: string;
        rgb: number[];
      };
    };
    states: {
      positive: { hex: string; rgb: number[] };
      negative: { hex: string; rgb: number[] };
      warning: { hex: string; rgb: number[] };
    };
    // OLD SYSTEM
    headerBg: { hex: string; rgb: number[] };
    mainBg: { hex: string; rgb: number[] };
    primary: { hex: string; rgb: number[] };
    secondary: { hex: string; rgb: number[] };
    darkBlue: { hex: string; rgb: number[] };
    textDarkBlue: { hex: string; rgb: number[] };
    lightBlue: { hex: string; rgb: number[] };
    red: { hex: string; rgb: number[] };
    orange: { hex: string; rgb: number[] };
    green: { hex: string; rgb: number[] };
    darkGreen: { hex: string; rgb: number[] };
    purple: { hex: string; rgb: number[] };
    white: { hex: string; rgb: number[] };
    whiteElement: { hex: string; rgb: number[] };
    whiteItem: { hex: string; rgb: number[] };
    darkOrange: { hex: string; rgb: number[] };
    gray: { hex: string; rgb: number[] };
    lightGray: { hex: string; rgb: number[] };
    disabledGray: { hex: string; rgb: number[] };
    brand: {
      main: string;
      mainOffset1: string;
      primary: string;
      primaryOffset1: string;
    };
    background: {
      main: string;
      nav: string;
      footer: string;
    };
    text: {
      main: string;
      positive: string;
      negative: string;
      offset1: string;
      offset2: string;
      offset3: string;
      offset4: string;
      offset5: string;
      offset6: string;
    };
    note: {
      main: string;
      offset1: string;
      offset2: string;
    };
    interface: {
      mainTable: string;
      tableBorder: string;
      divider: string;
      hover: string;
      offset1: string;
    };
    gradient: {
      main: string;
      primary: string;
      positive: string;
      negative: string;
    };
  };
}
