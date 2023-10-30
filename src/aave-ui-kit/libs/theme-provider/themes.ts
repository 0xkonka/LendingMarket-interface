import { Themes } from './types';

// eslint-disable-next-line import/prefer-default-export
export const themes: Themes = {
  default: {
    // NEW SYSTEM
    common: {
      white: {
        hex: '#FFFFFF',
        rgb: [255, 255, 255],
      },
    },
    palette: {
      token1: {
        hex: '#F7F7F8',
        rgb: [247, 247, 248],
      },
      token2: {
        hex: '#FFFFFF',
        rgb: [255, 255, 255],
      },
      token3: {
        hex: '#E9EDF2',
        rgb: [233, 247, 242],
      },
      token4: {
        hex: '#D7DCE5',
        rgb: [215, 220, 229],
      },
    },
    text2: {
      default: {
        hex: '#000000',
        rgb: [0, 0, 0],
      },
      subdued: {
        hex: '#748088',
        rgb: [116, 128, 136],
      },
    },
    accent: {
      default: {
        hex: '#784FFE',
        rgb: [120, 79, 254],
      },
    },
    states: {
      positive: {
        hex: '#00D897',
        rgb: [0, 216, 151],
      },
      negative: {
        hex: '#F1356E',
        rgb: [241, 53, 110],
      },
      warning: {
        hex: '#FFBE0B',
        rgb: [255, 190, 11],
      },
    },
    // OLD SYSTEM
    headerBg: { hex: '#131313', rgb: [19, 19, 19] },
    mainBg: { hex: '#f5f6fa', rgb: [241, 241, 243] },
    primary: { hex: '#b6509e', rgb: [182, 80, 158] },
    secondary: { hex: '#2ebac6', rgb: [46, 186, 198] },
    darkBlue: { hex: '#131313', rgb: [19, 19, 19] },
    textDarkBlue: { hex: '#131313', rgb: [19, 19, 19] },
    lightBlue: { hex: '#8d8f99', rgb: [141, 143, 153] },
    red: { hex: '#ff46a5', rgb: [255, 70, 165] },
    orange: { hex: '#ffac4d', rgb: [255, 172, 77] },
    green: { hex: '#aceed9', rgb: [121, 201, 130] },
    darkGreen: { hex: '#008c79', rgb: [0, 140, 121] },
    purple: { hex: '#7159ff', rgb: [113, 89, 255] },
    white: { hex: '#ffffff', rgb: [255, 255, 255] },
    whiteElement: { hex: '#ffffff', rgb: [255, 255, 255] },
    whiteItem: { hex: '#ffffff', rgb: [255, 255, 255] },
    darkOrange: { hex: '#f0650a', rgb: [240, 101, 10] }, // for deposit APY
    gray: { hex: '#707070', rgb: [112, 112, 112] },
    lightGray: { hex: '#a2a2a2', rgb: [162, 162, 162] },
    disabledGray: { hex: '#e0e0e2', rgb: [224, 224, 226] },
    brand: {
      main: '#5F00FA',
      mainOffset1: '#711BFF',
      primary: '#00FFAA',
      primaryOffset1: '#00AC73',
    },
    background: {
      main: '#F0F2F5',
      nav: '#FFFFFF',
      footer: '#F0F2F5',
    },
    text: {
      main: '#0F172A',
      positive: '#28CD41',
      negative: '#FF3B30',
      offset1: '#384454',
      offset2: '#475569',
      offset3: '#9199A5',
      offset4: '#CCD5E1',
      offset5: '#F8FAFC',
      offset6: '#FFFFFF',
    },
    note: {
      main: '#F1AA1C',
      offset1: '#FFEE79',
      offset2: '#FEFCEB',
    },
    interface: {
      mainTable: '#FFFFFF',
      tableBorder: '#DBE3FB',
      divider: '#DBE3FB',
      hover: '#F9F8FC',
      offset1: '#EBE9F2',
    },
    gradient: {
      main: 'linear-gradient(268.5deg, #C800FA 1.25%, #5F00FA 52.42%, #4C00C7 101.57%)',
      primary: 'linear-gradient(180deg, #00FFAA 10.66%, #5F00FA 99.26%)',
      positive: 'linear-gradient(270deg, #00FFAA 0.03%, #006A47 100%)',
      negative: 'linear-gradient(270deg, #EB0000 0.03%, #580000 100%)',
    },
  },
  dark: {
    // NEW SYSTEM
    common: {
      white: {
        hex: '#FFFFFF',
        rgb: [255, 255, 255],
      },
    },
    palette: {
      token1: {
        hex: '#0C1013',
        rgb: [12, 16, 19],
      },
      token2: {
        hex: '#181C1F',
        rgb: [24, 28, 31],
      },
      token3: {
        hex: '#252A2E',
        rgb: [37, 42, 46],
      },
      token4: {
        hex: '#32383D',
        rgb: [50, 56, 61],
      },
    },
    text2: {
      default: {
        hex: '#FFFFFF',
        rgb: [255, 255, 255],
      },
      subdued: {
        hex: '#748088',
        rgb: [116, 128, 136],
      },
    },
    accent: {
      default: {
        hex: '#A387FF',
        rgb: [163, 135, 255],
      },
    },
    states: {
      positive: {
        hex: '#00D897',
        rgb: [0, 216, 151],
      },
      negative: {
        hex: '#F1356E',
        rgb: [241, 53, 110],
      },
      warning: {
        hex: '#FFBE0B',
        rgb: [255, 190, 11],
      },
    },
    // OLD SYSTEM
    headerBg: { hex: '#20202e', rgb: [32, 32, 46] },
    mainBg: { hex: '#2b2d3c', rgb: [43, 45, 60] },
    primary: { hex: '#b6509e', rgb: [182, 80, 158] },
    secondary: { hex: '#2ebac6', rgb: [46, 186, 198] },
    darkBlue: { hex: '#383d51', rgb: [56, 61, 81] },
    textDarkBlue: { hex: '#f1f1f3', rgb: [241, 241, 243] },
    lightBlue: { hex: '#8d8f99', rgb: [141, 143, 153] },
    red: { hex: '#de5959', rgb: [222, 89, 89] },
    orange: { hex: '#ffac4d', rgb: [255, 172, 77] },
    green: { hex: '#79c982', rgb: [121, 201, 130] },
    darkGreen: { hex: '#008c79', rgb: [0, 140, 121] },
    purple: { hex: '#7159ff', rgb: [113, 89, 255] },
    white: { hex: '#f1f1f3', rgb: [241, 241, 243] },
    whiteElement: { hex: '#383d51', rgb: [56, 61, 81] },
    whiteItem: { hex: '#2b2d3c', rgb: [43, 45, 60] },
    darkOrange: { hex: '#f0650a', rgb: [240, 101, 10] }, // for deposit APY
    gray: { hex: '#707070', rgb: [112, 112, 112] },
    lightGray: { hex: '#a2a2a2', rgb: [162, 162, 162] },
    disabledGray: { hex: '#20202e', rgb: [32, 32, 46] },
    brand: {
      main: '#00FFAA',
      mainOffset1: '#00AC73',
      primary: '#5F00FA',
      primaryOffset1: '#711BFF',
    },
    background: {
      main: '#060606',
      nav: '#000000',
      footer: '#000000',
    },
    text: {
      main: '#DFE7F3',
      positive: '#30D158',
      negative: '#FF453A',
      offset1: '#B0B6CD',
      offset2: '#5D6E86',
      offset3: '#9199A5',
      offset4: '#CCD5E1',
      offset5: '#F8FAFC',
      offset6: '#000000',
    },
    note: {
      main: '#F1AA1C',
      offset1: '#FFEE79',
      offset2: '#FEFCEB',
    },
    interface: {
      mainTable: '#090C10',
      tableBorder: '#0A0D11',
      divider: '#0C1220',
      hover: '#121929',
      offset1: '#21293D',
    },
    gradient: {
      main: 'linear-gradient(268.5deg, #00FFAA 1.25%, #4C00C7 101.57%)',
      primary: 'linear-gradient(180deg, #00FFAA 10.66%, #5F00FA 99.26%)',
      positive: 'linear-gradient(270deg, #00FFAA 0.03%, #006A47 100%)',
      negative: 'linear-gradient(270deg, #EB0000 0.03%, #580000 100%)',
    },
  },
};
