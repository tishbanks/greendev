// components/AnimatedText.jsx
import React from 'react'
import Typewriter from './Typewriter'
import ScrambleText from './ScrambleText'
import BubleText from './BubleText'
import Pop3DText from './Pop3DText'

export default function AnimatedText({ text, effect, onComplete, speed }) {
  switch (effect) {
    case 'typewriter':
      return <Typewriter text={text} speed={speed || 50} onComplete={onComplete} />
    case 'scramble':
      return <ScrambleText text={text} speed={speed || 30} onComplete={onComplete} />
    case 'buble':
        return <BubleText text={text} speed={speed || 25} onComplete={onComplete} />
    case 'pop':
        return <Pop3DText text={text} speed={speed || 25} onComplete={onComplete} />
    default:
      return <span>{text}</span>
  }
}
