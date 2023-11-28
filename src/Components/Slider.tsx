import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlayCircle } from "react-icons/fa";

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
      {/* <h2 className={sliderStyles.header}>Recommended for you</h2> */}
      <Swiper
        slidesPerView={1}
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
                  <div className={sliderStyles.info} >
                      <h1>{slide.title}</h1>
                      <h2>{slide.seasons} {slide.seasons > 1 ? "Seasons": "Season"} </h2>
                      <button style={{ display: 'inline-flex',
                      fontSize: '22px',
                      padding: '0.4rem',
                      borderRadius: '1.5rem',
                      border: 'none',
                      backgroundColor: '#AA336A',
                      transition: '0.4s ease-in'
  
                      }}> GO LISTEN NOW < FaPlayCircle style={{fontSize: '22px', marginLeft:'5px'}}/></button>
                  </div>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
}

export default Slider;