import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/styles.css";


const banners = [
   
    { id: 1, image: '../assets/banners/banner7.png', alt: "Banner7" },
    { id: 2, image: '../assets/banners/banner8.png', alt: "Banner8" },
    { id: 3, image: '../assets/banners/banner6.png', alt: "Banner6" },
];


const Carousel = () => {
    const settings={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
  return (
    <div className="banner-carousel">
       <Slider {...settings}>
    {banners.map((banner) => (
        <div key={banner.id}>
            <img src={banner.image} alt={banner.alt} className="banner-image" />
        </div>
    ))}
</Slider>

      
    </div>
  )
}

export default Carousel;
