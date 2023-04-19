import { navs } from '@/data'
import Link from 'next/link';
import React from 'react'

export const AppNavigations = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />);

    return (
        <nav className='flex justify-end gap-2 w-full'>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item }) => {
    const { name, path, icon } = item

    return (
        <Link 
            className='flex items-center gap-2 px-2 text-2xl bg-zinc-600 text-zinc-200 rounded-md'
            href={path}
        >
            <span>{name}</span>
            {icon}
        </Link>
    )
}