export const types = [
    {
        name: "AND",
        text: "q=Microsoft AND Tesla, q=Microsoft && Tesla"
    },
    {
        name: "OR",
        text: "q=Apple OR Microsoft, q=Apple || Microsoft"
    },
    {
        name: "GROUPING",
        text: "q=(Apple AND Cook) OR (Microsoft AND Gates), q=(Apple && Cook) || (Microsoft && Gates)"
    },
    {
        name: "MUST HAVE",
        text: "q=+Elon"
    },
    {
        name: "MUST NOT",
        text: "q=-Grimes"
    }
]