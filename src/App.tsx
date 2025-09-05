import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";

import "swiper/css";

const App = () => {
    useEffect(() => {
        gsap.from(".title", { opacity: 0, y: -50, duration: 1 });
    }, []);

    return (
        <div className="app">
            <h1 className="title">Привет из React!</h1>

            <Swiper spaceBetween={50} slidesPerView={1}>
                <SwiperSlide>Слайд 1</SwiperSlide>
                <SwiperSlide>Слайд 2</SwiperSlide>
                <SwiperSlide>Слайд 3</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default App;
