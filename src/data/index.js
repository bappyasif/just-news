import { MdSatelliteAlt, MdDashboard, MdSource, MdWebStories, MdLogin, MdLogout, MdHome, MdSecurity, MdHttp, MdOutlineQueryBuilder } from "react-icons/md"
import {FaGithubAlt, FaTwitter, FaLinkedinIn, FaDatabase, } from "react-icons/fa"
import {TbBrandGithub, TbBrandMongodb, TbBrandNextjs, TbBrandReact, TbBrandTailwind, TbIcons} from "react-icons/tb"

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
    }
];

export const settingsLinks = [
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
]

export const navLinks = [
    {
        name: "News Sources",
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
    }
];

export const swearWords = [
    "Arse", "Bloody", "Bugger", "Crap", "Damn", "Goddam", "Minger", "Sod-off",
    "Arsehole", "Balls", "Bint", "Bitch", "Bollocks", "Bullshit", "Feck", "Munter",
    "Pissed off", "Shit", "Son of a bitch", "Tits", "Bastard", "Beef curtains",
    "Bellend", "Bloodclaat", "Clunge", "Cock", "Dick", "Dickhead", "Fanny", 
    "Flaps", "Gash", "Knob", "Minge", "Prick", "Punani", "Pussy", "Twat", "Cunt", 
    "Fuck", "Motherfucker"
]

export const footerProfileLinks = [
    {icon: <FaGithubAlt />, url: "https://github.com/bappyasif"},
    {icon: <FaTwitter />, url: "https://twitter.com/bappyasif"},
    {icon: <FaLinkedinIn />, url: "https://bd.linkedin.com/in/asifuzzaman-bappy-3583236b?trk=author_mini-profile_title"}
]

export const stacksUsed = [
    {icon: <TbBrandMongodb />, name: "MongoDb", url: "https://www.mongodb.com"},
    {icon: <TbBrandReact />, name: "React", url: "https://react.dev/"},
    {icon: <TbBrandNextjs />, name: "NextJs", url: "https://nextjs.org/"},
    {icon: <MdHttp />, name: "Axios", url: "https://axios-http.com/docs/intro"},
    {icon: <MdOutlineQueryBuilder />, name: "Tanstack React Queries", url: "https://tanstack.com/query/latest"},
    {icon: <TbBrandTailwind />, name: "Tailwind", url: "https://tailwindcss.com/docs"},
    {icon: <MdSecurity />, name: "Next Auth", url: "https://next-auth.js.org/"},
    {icon: <FaDatabase />, name: "Mongoose", url: "https://mongoosejs.com/docs/guide.html"},
    {icon: <TbIcons />, name: "React Icons", url: "https://react-icons.github.io/react-icons"}
]