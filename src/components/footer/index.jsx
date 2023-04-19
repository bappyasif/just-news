import React from 'react'
import { ImageComponent, ReUsableImageComponent } from '../navbar'
import footerImg from "../../../public/abstract.jpg"
// import footerImg from "../../../public/footerPic.jpg"
// import footerImg from "../../../public/newspapersPile.jpg"

export const FooterElement = () => {
    return (
        <footer
            className='absolute bottom-0'
        >
            <div className='absolute w-full text-center'>FooterElement</div>
            {/* <ReUsableImageComponent 
            height={"130px"} 
            width={"100%"} 
            altText={"abstract image as a footer background"} 
            imgSrc={footerImg}
        /> */}
            <div
                style={{
                    height: "80px",
                    width: "100%",
                    overflow: "hidden",
                    zIndex: -1
                }}
            >
                {/* <div>FooterElement</div> */}
                <ImageComponent
                    imgSrc={footerImg}
                    altText={"abstract image as a footer background"}
                />
                {/* <div>FooterElement</div> */}
            </div>
            {/* <div>FooterElement</div> */}
        </footer>
    )
}
