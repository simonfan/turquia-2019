import React from 'react'
import './App.scss'

import { Block } from '../Block/Block'
import { DataContext } from '../DataContext/DataContext'
import IMAGES from '../../data/images.json'

export const App = ({
  sections
}) => {
  return <DataContext.Provider value={{
      resolveImageUrls: ({ id }) => ({
        placeholderSrc: `photos/miniature/${id}`,
        src: `photos/display/${id}`,
      }),
      getImageData: ({ id }) => IMAGES[id]
    }}>
    <main className='App'>
      {sections.map((section, index) => (
        <Block
          key={index}
          {...section}
        />
      ))}
    </main>
  </DataContext.Provider>
}
