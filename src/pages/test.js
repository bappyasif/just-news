import { makeRoutes } from '@/utils';
import { useRouter } from 'next/router'
import React from 'react'
// hello everybody, im trying to use "router" from nextjs with "shallow routing", which shows up fin in browser just fine, but when trying to use it with "getServerSideProp", then i can see "url string" bit differently than i want it to be, for example "http:localhost:3001/test?a=a&

const TestingSSRWithQuery = () => {
    const router = useRouter();

    const makeRoutes = (entries) => {
        let str = '';
        for (let key in entries) {
            if (entries[key]) {
                str += `?${key}=${entries[key]}`
            }
        }
        return str
    }

    const handleClick = () => router.push(`/test${makeRoutes({ a: "a", b: "b" })}`, undefined, { shallow: true })
    
    return (
        <div onClick={handleClick}>TestingSSR</div>
    )
}

export const getServerSideProps = async context => {
    const { params, req, res, query } = context;
    // pre-rendeing undefined { a: 'a?b=b' }   <<output that im getting>>
    console.log("pre-rendeing", params, query)
    // expected outcome: {a: "a", b: "b"} from "query", how do i do that? unless i have to manually do that

    return {
        props: {
            test: "test"
        }
    }
}

export default TestingSSRWithQuery