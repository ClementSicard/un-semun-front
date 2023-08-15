
import { extendTheme } from "@chakra-ui/react";

export const unColor = "#4b92db";

export const theme = extendTheme({
    fonts: {
        body: 'Helvetica Neue, sans-serif',
        heading: 'Helvetica Neue, sans-serif',
    },
    colors: {
        doenet: {
            mainBlue: unColor,
            lightBlue: "#b8d2ea",
            solidLightBlue: "#8fb8de",
            mainGrey: "#e3e3e3",
            donutBody: "#eea177",
            donutTopping: "#6d4445",
            mainRed: "#c1292e",
            lightRed: "#eab8b8",
            mainGreen: "#459152",
            canvas: "#ffffff",
            canvastext: "#000000",
            lightGreen: "#a6f19f",
            lightYellow: "#f5ed85",
            whiteBlankLink: "#6d4445",
            mainYellow: "#94610a",
            mainPurple: "#4a03d9"
        }
    },
    components: {
        Text: {
            baseStyle: {
                fontWeight: "thin", // set your default font weight here
                fontSize: "16px"
            },
        },
        Heading: {
            baseStyle: {
                fontWeight: "semibold" // set your default font weight for headings here
            },
        },
        Input: {
            baseStyle: {
                fontWeight: "thin",
            }
        },
        Button: {
            baseStyle: {
                fontWeight: "thin",
                letterSpacing: ".5px",
                _focus: {
                    outline: "2px solid #2D5994",
                    outlineOffset: "2px"
                },
                _disabled: {
                    bg: "#E2E2E2",
                    color: "black"
                }
            },
            variants: {
                // We can override existing variants
                solid: {
                    bg: "doenet.mainBlue",
                    color: "white",
                    _hover: {
                        bg: "doenet.solidLightBlue",
                        color: "black",
                        _disabled: { bg: "doenet.mainGrey" }
                    }
                },
                outline: {
                    borderColor: "#2D5994",
                    _hover: {
                        bg: "doenet.solidLightBlue",
                        _disabled: { bg: "#E2E2E2" }
                    }
                },
                ghost: {
                    _hover: {
                        bg: "doenet.solidLightBlue",
                        _disabled: { bg: "#E2E2E2" }
                    }
                },
                link: {
                    color: "doenet.mainBlue"
                    // _disabled: { bg: "white" }
                }
            }
        }
    }
});
