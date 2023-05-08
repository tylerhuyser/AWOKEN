import React, {useState, useEffect} from 'react'

import "./Carousel.css"

export default function LandingPageCarousel(props) {

  const [carouselCount, setCarouselCount] = useState(0)
  const { carouselType, data } = props


  useEffect(() => {
    if (carouselCount === (data.length - 1)) {
      setCarouselCount(0)
    } else {
      setCarouselCount(carouselCount + 1)
    }
  }, [5000])

  if (carouselType === "landing page") {
    
    let carouselSlides = data.map((slide, index) => (
      <p className={index === carouselCount ? 'landing-page-carousel-copy active' : 'landing-page-carousel-copy inactive'}>
        <span className="landing-page-carousel-quote">{slide.quote}</span><br /><span className='landing-page-carousel-author'>{`- ${slide.author}`}</span>
      </p>))

    return (
      <div className='landing-page-carousel-container'>

      {carouselSlides}
      
    </div>
    )
  }

  if (carouselType === "login") {

    let carouselSlides = data.map((image, index) => (
      <img className={index === carouselCount ? 'login-page-carousel-image active' : 'login-page-carousel-image inactive'} src={image.path} alt={image.name} />
      ))

    return (
      <div className='login-page-carousel-container'>

      {carouselSlides}
      
    </div>
    )
  }

  if (carouselType === "register") {

    let carouselSlides = data.map((image, index) => (
      <img className={index === carouselCount ? 'register-page-carousel-image active' : 'register-page-carousel-image inactive'} src={image.path} alt={image.name} />
      ))

    return (
      <div className='login-page-carousel-container'>

      {carouselSlides}
      
    </div>
    )
  }

}