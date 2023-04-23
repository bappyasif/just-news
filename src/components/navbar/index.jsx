import { navs } from '@/data'
import Link from 'next/link';
import React from 'react'
import headerImg from "../../../public/abstract.jpg"
import logoImg from "../../../public/logo.png"
import { useRouter } from 'next/router';
import { ReUsableImageComponent } from '../shared';

export const AppNavigations = () => {
    const router = useRouter();
    console.log(router.pathname)
    return (
        <header className='mb-28 z-40'>
            <ReUsableImageComponent
                height={"101px"}
                width={"100%"}
                altText={"abstract image as a header background"}
                imgSrc={headerImg}
            />
            <div className='flex gap-4 px-0 pr-6'>
                <ReUsableImageComponent
                    height={"101px"}
                    width={"184px"}
                    altText={"For Fill"}
                    imgSrc={logoImg}
                />
                <RenderNavs />
            </div>
        </header>
    )
}

const RenderNavs = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />);

    return (
        <nav className='flex justify-end gap-4 w-full fixed'>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item }) => {
    const { name, path, icon } = item

    return (
        <Link
            className='flex items-center gap-2 p-4 text-2xl bg-zinc-600 text-zinc-200 rounded-md'
            href={path}
        >
            <span>{name}</span>
            {icon}
        </Link>
    )
}