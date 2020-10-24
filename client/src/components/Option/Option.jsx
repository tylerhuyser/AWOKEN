import React, { useState } from 'react';

import './Option.css'

export default function Option(props) {
  
  const { option, question_format } = props

  console.log(props)

  return(

    <div className="option-container">
      <p className="option" id={`option-${props.option.id}`}>{props.option.option_copy}</p>
    </div>

  )
}