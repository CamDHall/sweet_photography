import React, { useState, useEffect } from 'react';
import '../styles/portfolio.scss';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 1,
    500: 1
  };

const Portfolio = (iUrl: IUrlArray) => {
    generateImages(iUrl.urls);

    const [ fullScreenImageSrc, setFullScreenImage ] = useState("");

    const enlargeImage = (event: any) => {
        setFullScreenImage(event.target.src);
    }

    const items = images.map(function(image) {
        return (
            <img onClick={enlargeImage} aria-label="Image" src={process.env.PUBLIC_URL +"/images/gallery/" + image.src} key={image.src} />
        )
      });

    const closeImage = () => {
        setFullScreenImage("");
    }

    return(
        <React.Fragment>
        <div className="wrapper portfolio">
            <div className="gallery">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="grid"
                    columnClassName="grid-column">
                        { items }
                </Masonry>
            </div>
        </div>
        {fullScreenImageSrc !== "" ? 
            (
            <div className="fullscreen-image">
                <img src={fullScreenImageSrc} alt={fullScreenImageSrc} />
                <button className="close" onClick={closeImage}>&#10005;</button>
            </div>
            ) : null
        }
        </React.Fragment>
    );
}

let images: any[] = [];

function generateImages(urls: string[]) {
    images = [];
    urls.forEach(element => {
        images.push({ src: element});
    });
}

export default Portfolio;

export interface IUrlArray {
    urls: string[];
}