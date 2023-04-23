import React from 'react'
import footerImg from "../../../public/abstract.jpg"
import { ImageComponent } from '../shared'
// import footerImg from "../../../public/footerPic.jpg"
// import footerImg from "../../../public/newspapersPile.jpg"

export const FooterElement = () => {
    return (
        <footer
            // className='absolute bottom-0'
        >
            <div className='w-full text-center'>FooterElement</div>
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
        </footer>
    )
}
