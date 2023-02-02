import { styled, Heading, Text } from "@ignite-ui/react"

export const Container = styled("div", {
    maxWidth: "calc(100vw - (100vw - 1160px) / 2)",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    height: "100vh",
    gap: "$20",
})

export const Hero = styled("div", {
    maxWidth: 480,
    padding: "0 $10",

    [`> ${Heading}`]: {

        '@media(max-width: 600px)': {
            fontSize: "$5xl",
        }
    },

    [`> ${Text}`]: {
        marginTop: "$2",
        color: "$gray-200",
        fontSize: "$xl",
    }
})


export const Preview = styled("div", {
    paddingRight: "$8",
    overflow: "hidden",

    '@media(max-width: 600px)': {
        display: "none",
    }
})