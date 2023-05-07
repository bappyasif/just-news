import { navs, settingsLinks } from '@/data'
import Link from 'next/link';
import React, { useState } from 'react'
import headerImg from "../../../public/abstract.jpg"
import logoImg from "../../../public/logo.png"
import { ReUsableImageComponent } from '../shared';
import { useSession } from 'next-auth/react';
import { MdOutlineAppSettingsAlt } from 'react-icons/md';
import { useRouter } from 'next/router';

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

const AppSettings = () => {
    const [showDD, setShowDD] = useState(false)
    const [showTip, setShowTip] = useState(false)

    const handleShowTip = () => setShowTip(true)

    const handleHideTip = () => setShowTip(false)

    const handleToggleDD = () => setShowDD(prev => !prev)

    const handleHideDD = () => setShowDD(false)

    return (
        <div className='relative'>
            <button
                onMouseEnter={handleShowTip}
                onMouseLeave={handleHideTip}
                onClick={handleToggleDD}
                className='flex items-center gap-2 text-xl
                    xxs:p-1 xs:p-2 sm:p-3 xl:p-4 xxl:text-4xl
                  bg-zinc-600 text-zinc-200 rounded-md'
            >
                <span className='xs:text-xl sm:text-4xl lg:text-2xl'><MdOutlineAppSettingsAlt /></span>
                <span className='xxs:hidden lg:block xxs:text-xl sm:text-4xl lg:text-sm xl:text-2xl'>Settings</span>
            </button>

            {
                showTip
                    ? <p className='xxs:block lg:hidden absolute min-w-max right-0 bg-slate-400 px-2 rounded-md'>Settings</p>
                    : null
            }

            {
                showDD
                    ? <RenderDropdowns hideDD={handleHideDD} />
                    : null
            }
        </div>
    )
}

const RenderDropdowns = ({ hideDD }) => {
    const renderDds = () => settingsLinks.map(item => <RenderOption key={item.name} item={item} hideDD={hideDD} />)

    return (
        <div className='absolute right-0 bg-slate-800 px-1 py-1 rounded-sm'>
            {renderDds()}
        </div>
    )
}

const RenderOption = ({ item, hideDD }) => {
    const { icon, name, path } = item;

    const { data: session } = useSession();

    const router = useRouter()

    const handleHide = () => {
        hideDD()
        router.push(path)
    }

    return (
        name !== "Sign In" && session?.user?.name
            ||
            (name !== "Saved Filters" && name !== "Sign Out" && !session?.user?.name)
            ?
            <div
                className='text-slate-400 bg-slate-900 min-w-max m-1 px-2
                hover:outline hover:outline-slate-400 hover:outline-x-2'
                value={name}
                onClick={handleHide}
            >
                <button className='flex gap-2 items-center'>
                    <span>{icon}</span>
                    <span>{name}</span>
                </button>
            </div>
            : null
    )
}

const RenderNavs = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />);

    return (
        <nav className='flex justify-end gap-4 w-full fixed'>
            {renderNavs()}
            <AppSettings />
        </nav>
    )
}

const RenderNav = ({ item }) => {
    const { name, path, icon } = item
    const { data: session } = useSession();
    const [showTip, setShowTip] = useState(false);
    const handleShowTip = () => setShowTip(true)
    const handleHideTip = () => setShowTip(false)

    return (
        <div className='relative'>
            <Link
                className='flex items-center gap-2 
                        xxs:p-1 xs:p-2 sm:p-3 xl:p-4 xxl:text-4xl
                      bg-zinc-600 text-zinc-200 rounded-md'
                href={path}
                onMouseEnter={handleShowTip}
                onMouseLeave={handleHideTip}
            >
                <span className='xxs:hidden lg:block lg:text-md xl:text-2xl'>{name}</span>
                <span className='xs:text-xl sm:text-4xl lg:text-2xl'>{icon}</span>
            </Link>
            {
                showTip
                    ? <p className='xxs:block lg:hidden absolute min-w-max right-0 bg-slate-400 px-2 rounded-md'>{name}</p>
                    : null
            }
        </div>
    )
}