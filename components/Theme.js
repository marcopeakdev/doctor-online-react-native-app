// @flow
type Typography = {
  fontFamily: string,
  fontSize: number,
  lineHeight: number
};

type Color = string;

type Theme = {
  palette: {
    primary: Color,
    info: Color,
    secondary: Color,
    success: Color,
    danger: Color,
    warning: Color,
    sidebar: Color,
    lightGray: Color
  },
  typography: {
    color: string,
    bold: string,
    semibold: string,
    normal: string,
    light: string,
    header1: Typography,
    header2: Typography,
    header3: Typography,
    large: Typography,
    regular: Typography,
    small: Typography,
    micro: Typography
  },
  spacing: {
    tiny: number,
    small: number,
    base: number,
    large: number,
    xLarge: number
  }
};

const theme: Theme = {
  palette: {
    primary: "#00A699",
    info: "#00A699",
    secondary: "#f7555c",
    success: "#5cb85c",
    danger: "#d93900",
    warning: "#f0ad4e",
    sidebar: "#484848",
    lightGray: "rgba(72, 72, 72, 0.2)"
  },
  typography: {
    color: "#484848",
    bold: "SFProDisplay-Bold",
    semibold: "SFProDisplay-Semibold",
    normal: "SFProDisplay-Light",
    light: "SFProDisplay-Light",
    header1: {
      fontSize: 44,
      lineHeight: 56,
      fontFamily: "SFProDisplay-Bold"
    },
    header2: {
      fontSize: 32,
      lineHeight: 36,
      fontFamily: "SFProDisplay-Light"
    },
    header3: {
      fontSize: 24,
      lineHeight: 28,
      fontFamily: "SFProDisplay-Light"
    },
    large: {
      fontSize: 19,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold"
    },
    regular: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: "SFProDisplay-Light"
    },
    small: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Light"
    },
    micro: {
      fontSize: 8,
      lineHeight: 8,
      fontFamily: "SFProDisplay-Bold"
    }
  },
  spacing: {
    tiny: 8,
    small: 16,
    base: 24,
    large: 48,
    xLarge: 64
  }
};

export { theme as Theme };
