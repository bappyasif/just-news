import React from 'react'
import bodyImg from "../../../public/cityscapeNight.jpg"
import Image from 'next/image'

export const BackgroundImage = () => {
    return (
        <div
            className='fixed'
            style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                zIndex: - 1
            }}
        >
            <Image
                // className='absolute'
                src={bodyImg}
                alt='cityscape night view for site background'
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    // layout: "fill",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
            />
        </div >
    )
}
