import React, {useState, useEffect} from 'react'

import "./Carousel.css"

export default function Carousel(props) {

  const [carouselCount, setCarouselCount] = useState(0)
  const { carouselType, data } = props


  useEffect(() => {
    if (carouselType === "login") {
      setTimeout(() => {
        if (carouselCount === (data.length - 1)) {
          setCarouselCount(0)
        } else {
          setCarouselCount(carouselCount + 1)
        }
      }, [25000])
    } else {
      setTimeout(() => {
        if (carouselCount === (data.length - 1)) {
          setCarouselCount(0)
        } else {
          setCarouselCount(carouselCount + 1)
        }
      }, [5000])
    }
  }, [carouselCount])

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

    let carouselSlides = data.map((gif, index) => (
      <img className={index === carouselCount ? 'login-page-carousel-gif' : 'login-page-carousel-gif inactive'} src={gif.path} alt={gif.name} />
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
      <div className='register-page-carousel-container'>

      {carouselSlides}
      
    </div>
    )
  }

}