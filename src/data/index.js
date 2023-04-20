import {MdSatelliteAlt, MdPerson4, MdDashboard, MdSource, MdViewList, MdVerified, MdWebStories, MdLogin, MdLogout, MdHome} from "react-icons/md"

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

export const navs = [
    {
        name: "Home",
        path: "/",
        icon: <MdHome />
    },
    {
        name: "Sources",
        path: "/sources",
        icon: <MdSource />
    },
    {
        name: "Search News",
        path: "/news",
        icon: <MdWebStories />
    },
    {
        name: "News Headlines",
        path: "/headlines",
        icon: <MdSatelliteAlt />
    },
    {
        name: "Saved Filters",
        path: "/saved-filters",
        icon: <MdDashboard />
    },
    {
        name: "Sign In",
        path: "/",
        icon: <MdLogin />
    },
    {
        name: "Sign Out",
        path: "/",
        icon: <MdLogout />
    },
]