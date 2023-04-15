# just-news
a site with MERN stack using nextjs, tanstack queries, axios, nextauth, tailwindcss, and others

# news site

## navs

- sources
- headlines
- news
- stored filters
- sign in
- sign out
- home page

## routes - functionalities will be offered

- sources - list of news providers
    - chooose language
    - choose countries
    - choose topic
- headlines
    - when - 1hr, 24hr, 7d or 30d
    - lang - **ISO 639-1 — 2**
     letter code
    - countries
    - topics
    - sources - nytimes.com,theguardian.com
- news
    - query - with or without Advanced parameters
    - lang - ISO 639-1 — 2
    letter code
    - countries
    - topic
    - sources
- stored filters
    - show already stored filters by user
    - view should include explanation of those filters used in there for clarifications
    - filters are clickable so that they can view news from it
    - view should also some sort of appropriate visuals to mitigate that

## view

- top right aligned navs
- news lists are rendered in 1-4 columns layout
- in “news” and “headlines” allow “logged in users” to store these “used filters” in any search
- in “news” also allow user to use “advanced query” and give “click and select” functionality for easements

## tech stack - MERN

- nextjs
- next-auth
- mongodb
- t.a.n.t.
- useContext
- useReducer
- custom hooks
- theme

## motivation

to give users from all around de globe to have a chance to see their preferred news from this place and store their used filters for future use

## aiming Perks

to show users some sort of “live” searched “queries” used by other “users” anonymously 

## news data source - newscatcher api

[https://newscatcherapi.com/](https://newscatcherapi.com/)
