import React from 'react'
import clsx from 'clsx'

export const HeroTitle = ({ children, className }) => (
  <h1
    className={clsx(
      'font-poppins font-bold text-4xl md:text-6xl mb-6 leading-tight drop-shadow-md text-greendev-text',
      className
    )}
  >
    {children}
  </h1>
)

export const SecondTitle = ({ children, className }) => (
  <h1
    className={clsx(
      'font-poppins font-semibold text-xl md:text-lg mb-16 leading-tight drop-shadow-md text-greendev-text',
      className
    )}
  >
    {children}
  </h1>
)

export const Title = ({ children, className }) => (
  <h2
    className={clsx(
      'font-poppins font-semibold text-4xl mb-20 text-greendev',
      className
    )}
  >
    {children}
  </h2>
)

export const Title2 = ({ children, className }) => (
  <h2
    className={clsx(
      'font-poppins font-semibold text-8xl md:text-4xl mb-20 text-center text-greendev',
      className
    )}
  >
    {children}
  </h2>
)

export const Subtitle = ({ children, className }) => (
  <p
    className={clsx(
      'font-inter font-medium text-lg md:text-lg text-greendev mb-4',
      className
    )}
  >
    {children}
  </p>
)

export const Paragraph = ({ children, className }) => (
  <p
    className={clsx(
      'font-inter font-normal text-base leading-relaxed text-greendev-text',
      className
    )}
  >
    {children}
  </p>
)

export const ButtonText = ({ children, className }) => (
  <span
    className={clsx(
      'font-inter font-medium text-base text-white',
      className
    )}
  >
    {children}
  </span>
)
