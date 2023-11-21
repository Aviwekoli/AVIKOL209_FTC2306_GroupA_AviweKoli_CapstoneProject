import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import sliderStyles from './sliderStyles.module.css';
// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            fetch("https://podcast-api.netlify.app/shows")
            .then(res => res.json())
            .then(data => setItems([...data].sort((a, b) => a.title.localeCompare(b.title))))
        } catch (error) {
            console.error(error.message)
        }
    });

    // const getRandomItems = (array, numberOfItems) => {
    //     const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    //     return shuffledArray.slice(0, numberOfItems);
    //   }

    // const Slides = getRandomItems(items, 10);
    // console.log(Slides);
    const Slides = items.slice(0, 10);
  return (
    <>
      <h2 className={sliderStyles.header}>RECOMMENDED SHOWS</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className= {sliderStyles.swiper}
      >
        {Slides.map(slide => {
            return (
                <SwiperSlide key={slide.id} className={sliderStyles.slide}>
                    <img src={slide.image} alt="" className={sliderStyles.image} />
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
}

export default Slider;