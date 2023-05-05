import { navs } from '@/data'
import Link from 'next/link';
import React from 'react'
import headerImg from "../../../public/abstract.jpg"
import logoImg from "../../../public/logo.png"
import { ReUsableImageComponent } from '../shared';
import { useSession } from 'next-auth/react';

export const AppNavigations = () => {
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
    const { data: session } = useSession();

    return (
        name !== "Sign In" && session?.user?.name
            ||
            (name !== "Saved Filters" && name !== "Sign Out" && !session?.user?.name)
            ?
            <Link
                className='flex items-center gap-2 
                xxs:p-1 xs:p-2 sm:p-3 xl:p-4 xxl:text-4xl
                bg-zinc-600 text-zinc-200 rounded-md'
                href={path}
            >
                <span className='xxs:hidden lg:block lg:text-md xl:text-2xl'>{name}</span>
                <span className='xs:text-xl sm:text-4xl lg:text-2xl'>{icon}</span>
            </Link>
            : null
    )
}