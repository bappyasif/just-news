import React from 'react'
import footerImg from "../../../public/abstract.jpg"
import { ImageComponent } from '../shared'
import { footerProfileLinks, stacksUsed } from '@/data'
import Link from 'next/link'
import { TbTrademark } from 'react-icons/tb'

export const FooterElement = () => {
    return (
        <footer
            className='relative mt-2'
        >
            <FooterContents />
            <div
                style={{
                    height: "60px",
                    width: "100%",
                    overflow: "hidden",
                    zIndex: -1,
                    rotate: "-180deg"
                }}
            >
                <ImageComponent
                    imgSrc={footerImg}
                    altText={"abstract image as a footer background"}
                />
            </div>
            {/* <div className='w-full text-center'>FooterElement</div> */}
        </footer>
    )
}

const FooterContents = () => {
    return (
        <section className='absolute z-40 flex justify-between text-2xl w-full'>
            <ShowStacksUsedInfo />
            <TrademarkInfo />
            <GetInTouchInfo />
        </section>
    )
}

const TrademarkInfo = () => {
    return (
        <div className='flex gap-2 justify-start text-lg text-slate-950 font-medium'>
            <span className='text-2xl'><TbTrademark /></span>
            <span><span className='xxs:hidden md:block'>Devloped By: </span>a b</span>
        </div>
    )
}

const ShowStacksUsedInfo = () => {
    const renderInfo = () => stacksUsed.map(item => <RenderInfo key={item.name} item={item} />)

    return (
        <div className='text-blue-600 flex-wrap'>
            <h2>Stacks Used</h2>
            <ul className='flex gap-2 justify-start'>
                {renderInfo()}
            </ul>
        </div>
    )
}

const RenderInfo = ({ item }) => {
    const { icon, name, url } = item;

    return (
        <li>
            <Link href={url} target='_blank' className='flex gap-2 items-baseline text-lg font-bold text-slate-950'>
                <span className='xxs:hidden xl:block'>{name}</span>
                <span className='xxs:text-sm md:text-lg'>{icon}</span>
            </Link>
        </li>
    )
}

const GetInTouchInfo = () => {
    const renderLinks = () => footerProfileLinks.map(item => <RenderLink key={item.url} item={item} />)

    return (
        <div className='xxs:text-sm xl:text-2xl'>
            <h2 className=''>To Get In Touch</h2>
            <nav className='flex gap-2 justify-end'>
                {renderLinks()}
            </nav>
        </div>
    )
}

const RenderLink = ({ item }) => {
    const { icon, url } = item

    return (
        <Link href={url} target='_blank'>
            <span className='text-slate-600 xxs:text-sm xl:text-2xl'>{icon}</span>
        </Link>
    )
}