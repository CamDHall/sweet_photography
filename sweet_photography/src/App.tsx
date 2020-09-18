import React, { useRef, useState, useEffect } from 'react';
import './App.scss';
import urls from './settings/image_urls.json';
import Portfolio from './components/Portfolio';
import BookingContainer from './components/BookingContainer';

const scrollToRef = (ref: React.MutableRefObject<any>) => {
    window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
    });
}

const urlsGroup1 = urls.splice(0, Math.ceil(urls.length / 2));
const urlsGroup2 = urls.splice(0, urls.length);

function App() {
    const bookingRef = useRef(null);
    const executeScroll = () => scrollToRef(bookingRef);

    return (
        <React.Fragment>
            <button onClick={executeScroll} id="booking-btn">
                Book
            </button>
            <Portfolio urls={urlsGroup1} />
            <div className="wrapper bio">
                <div className="bio-text">
                    <h1><u>Rebekah Hurley</u></h1>
                    <p>I'm a professional dog trainer and photography. I specialize in off-leash training and behavior correction. I have four dogs of my own: Kanga (Newfoundland), Alaska (Catahoula), Tiny Tina (Dauschund), and Piglet (Corgi). </p>
                    {/*<img src='./images/signature_placeholder.webp' alt="Rebekah Hurley, Signature" />*/}
                </div>
            </div>
            <Portfolio urls={urlsGroup2} />
            <div ref={bookingRef} id="booking-container">
                <BookingContainer />
            </div>
            </React.Fragment>
    );
}

export default App;