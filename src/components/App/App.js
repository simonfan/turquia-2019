import React from 'react'
import './App.scss'

import { Section } from '../Section/Section'

export const App = ({
  sections
}) => {

  console.log(sections)

  return <main className='App'>
    {sections.map((section, index) => (
      <Section
        key={index}
        {...section}
      />
    ))}
  </main>
}
