import { navs } from '@/data'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import headerImg from "../../../public/abstract.jpg"
import logoImg from "../../../public/logo.png"
import { useRouter } from 'next/router';

export const AppNavigations = () => {
    const router = useRouter();
    console.log(router.pathname)
    return (
        <header className='mb-12'>
            <ReUsableImageComponent height={"101px"} width={"100%"} altText={"abstract image as a header background"} imgSrc={headerImg} />
            <ReUsableImageComponent
                height={"101px"}
                width={"168px"}
                // altText={"team work picture from unsplash used here as a background"}
                // altText={"For Logo"}
                altText={"For Fill"}
                imgSrc={logoImg}
            />
            <RenderNavs />
        </header>
    )
}

export const ReUsableImageComponent = ({ height, width, imgSrc, altText }) => {
    return (
        <div
            className='fixed'
            style={{
                height: height,
                width: width,
                overflow: "hidden",
                zIndex: - 1
            }}
        >
            <ImageComponent
                imgSrc={imgSrc}
                altText={altText}
            />
        </div>
    )
}

export const ImageComponent = ({ imgSrc, altText }) => {
    return (
        <Image
            // className='fixed'
            src={imgSrc}
            alt={altText}
            placeholder="blur"
            quality={100}
            style={{
                objectFit: altText === "For Fill" ? "fill" : altText === "For Logo" ? "contain" : "cover",
                height: altText === "For Fill" && "inherit",
                opacity: altText === "For Fill" && ".81"
            }}
        />
    )
}

const RenderNavs = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />);

    return (
        <nav className='flex justify-end gap-4 w-full'>
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