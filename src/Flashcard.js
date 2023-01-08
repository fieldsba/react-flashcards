import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)   //swap from flip to non-flipped state

  const [height, setHeight] = useState('initial');

  const frontEl = useRef();
  const backEl = useRef();


//sets maximum height of cards
  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  }

  //dynamically sets maximum height of cards
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);

  //resizes cards when window is resized
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, [])

  //if flip=true, return the answer
    return (
    <div 
        //use static class for card, if flip=true use flip class
        //if flip=false use default blank class
        className={`card ${flip ? 'flip' : ''}`}
        style={{ height: height}}
        onClick={() => setFlip(!flip)}>
        
            <div className="front" ref={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option" key={option}>{option}</div>
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}

