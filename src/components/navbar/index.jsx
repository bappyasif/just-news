import { navs } from '@/data'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
// import headerImg from "../../../public/newspapersPile.jpg"
import headerImg from "../../../public/abstract.jpg"
import { useRouter } from 'next/router';
// import headerImg from "../../../public/teamWork.jpg"

export const AppNavigations = () => {
    const router = useRouter();
    console.log(router.pathname)
    return (
        <header>
            {/* <HeaderImage /> */}
            {/* <ReUsableImageComponent height={"130px"} width={"100%"} altText={"abstract image as a header background"} imgSrc={headerImg} /> */}
            <ReUsableImageComponent height={"60px"} width={"100%"} altText={"abstract image as a header background"} imgSrc={headerImg} />
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

export const ImageComponent = ({imgSrc, altText}) => {
    return (
        <Image
                // className='fixed'
                src={imgSrc}
                alt={altText}
                placeholder="blur"
                quality={100}
                style={{
                    // rotate: "-360deg"
                    // objectFit: "cover"
                    objectFit: altText === "For Fill" ? "fill"  : "cover",
                    height: altText === "For Fill" && "inherit",
                    opacity: altText === "For Fill" && ".81"
                }}
            />
    )
}

// const HeaderImage = () => {
//     return (
//         <div
//             className='fixed'
//             style={{
//                 height: "130px",
//                 width: "100%",
//                 overflow: "hidden",
//                 zIndex: - 1
//             }}
//         >
//             <Image
//                 // className='fixed'
//                 src={headerImg}
//                 alt='cityscape night view for site background'
//                 placeholder="blur"
//                 quality={100}
//                 style={{
//                     // rotate: "-360deg"
//                     objectFit: "cover"
//                 }}
//             />
//         </div>
//     )
// }

const RenderNavs = () => {
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