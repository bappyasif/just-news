import { MdSatelliteAlt, MdPerson4, MdDashboard, MdSource, MdViewList, MdVerified, MdWebStories, MdLogin, MdLogout, MdHome } from "react-icons/md"

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
        path: "/api/auth/signin",
        icon: <MdLogin />
    },
    {
        name: "Sign Out",
        path: "/api/auth/signout",
        icon: <MdLogout />
    },
];

export const swearWords = [
    "Arse", "Bloody", "Bugger", "Crap", "Damn", "Goddam", "Minger", "Sod-off",
    "Arsehole", "Balls", "Bint", "Bitch", "Bollocks", "Bullshit", "Feck", "Munter",
    "Pissed off", "Shit", "Son of a bitch", "Tits", "Bastard", "Beef curtains",
    "Bellend", "Bloodclaat", "Clunge", "Cock", "Dick", "Dickhead", "Fanny", 
    "Flaps", "Gash", "Knob", "Minge", "Prick", "Punani", "Pussy", "Twat", "Cunt", 
    "Fuck", "Motherfucker"
]