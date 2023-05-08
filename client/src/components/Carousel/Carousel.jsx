import React, {useState, useEffect} from 'react'

import "./Carousel.css"

export default function Carousel(props) {

  const [carouselCount, setCarouselCount] = useState(0)
  const { carouselType, data } = props


  useEffect(() => {
    setTimeout(() => {
      if (carouselCount === (data.length - 1)) {
        setCarouselCount(0)
      } else {
        setCarouselCount(carouselCount + 1)
      }
    }, [5000])
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

    let carouselSlides = data.map((video, index) => (
      <iframe className={index === carouselCount ? 'login-page-carousel-video active' : 'login-page-carousel-video inactive'} src={video.path} alt={video.name} height="100vh" width="100vw" />
      ))

    return (
      <div className='login-page-carousel-container'>

        {carouselSlides}

        <>
        
          {/* <div styles="padding: 100% 0 0 0; position:relative;">
          <iframe src="https://player.vimeo.com/video/417757879?h=da34f27fe3&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen styles="position:absolute;top:0;left:0;width:50vw;height:100vh;objectFit:cover" title="After immigrating, where do you feel at home?"></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script> */}
          
        </>
      
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