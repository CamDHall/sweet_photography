import React, { useState, useEffect } from 'react';
import '../styles/portfolio.scss';
import {Masonry} from 'masonic';

const Portfolio = (iUrl: IUrlArray) => {
    generateImages(iUrl.urls);

    const [columnCount, setColumnCount ] = useState(getColumnCount());
    const [ fullScreenImageSrc, setFullScreenImage ] = useState("");

    useEffect(() => {
        const resetColumnCount = () => {
            setColumnCount(getColumnCount());
        };

        window.addEventListener('resize', resetColumnCount);
    });

    const MasonryElement = (data: any) => (
        <div className="grid-cell" role="group">
            <img src={process.env.PUBLIC_URL +"/images/gallery/" + data.data.src} alt={data.data.src} role="image" />
        </div>
    );

    const enlargeImage = (event: any) => {
        setFullScreenImage(event.target.src);
    }

    const closeImage = () => {
        setFullScreenImage("");
    }

    return(
        <React.Fragment>
        <div className="wrapper portfolio">
            <div className="gallery">
                <Masonry 
                    items={images} 
                    columnGutter={5}
                    columnCount={columnCount}
                    overscanBy={columnCount}
                    render={MasonryElement} 
                    className="no-border" 
                    role="grid" />
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

function getColumnCount() {
    const width = window.screen.availWidth;

    if (width > 1100) {
        return 4;
    }
    if (width > 1000) {
        return 3;
    }
    if (width > 800) {
        return 2;
    } else {
        return 1;
    }
}

export default Portfolio;

export interface IUrlArray {
    urls: string[];
}