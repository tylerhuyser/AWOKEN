import React, {useState, useEffect} from 'react'

import "./LandingPageCarousel.css"

export default function LandingPageCarousel() {

  const [carouselCount, setCarouselCount] = useState(0)

  const carouselSlidesData = [
    {
      quote: 'Diversity is being invited to the party. Inclusion is being asked to dance.',
      author: 'Verna Myer'
    },
    {
      quote: 'The problem with stereotypes is not that they are untrue but that they are incomplete. They make one story the only story.',
      author: 'Chimamanda Ngozi Adichie'
    }
  ]

//   let carousel = slides.map((slide, index) => {
//     if (index === counter) {
//       <p className='landing-page-carousel-copy active'>
//         <span className="landing-page-carousel-quote">Diversity is being invited to the party. Inclusion is being asked to dance.</span><br /><span className='landing-page-carousel-author'>- Verna Myer</span>
//       </p>
//     } else if (index) {
      
//     }
//  ))
  
  

  useEffect(() => {
    setTimeout(() => {
      if (carouselCount === (carouselSlidesData.length - 1)) {
        setCarouselCount(0)
      } else {
        setCarouselCount(carouselCount + 1)
      }
    }, [4000])
  }, [carouselCount])

  let carouselSlides = carouselSlidesData.map((slide, index) => (
    <p className={index === carouselCount ? 'landing-page-carousel-copy active' : 'landing-page-carousel-copy inactive'}>
      <span className="landing-page-carousel-quote">{slide.quote}</span><br /><span className='landing-page-carousel-author'>{`- ${slide.author}`}</span>
    </p>
  ))
  
  return (

    <div className='landing-page-carousel-container'>

      {/* <p className='landing-page-carousel-copy active'>
        <span className="landing-page-carousel-quote">Diversity is being invited to the party. Inclusion is being asked to dance.</span><br /><span className='landing-page-carousel-author'>- Verna Myer</span>
      </p>

      <p className='landing-page-carousel-copy inactive'>
        <span className="landing-page-carousel-quote">The problem with stereotypes is not that they are untrue but that they are incomplete. They make one story the only story.</span><br /><span className='landing-page-carousel-author'>- Chimamanda Ngozi Adichie</span>
      </p> */}

      {carouselSlides}
      
    </div>
  )
}