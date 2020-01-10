import React from 'react'
import './App.scss'

import { Block } from '../Block/Block'
import { DataContext } from '../DataContext/DataContext'

export const App = ({
  sections
}) => {
  return <DataContext.Provider value={{
      resolveImageUrls: ({ id }) => ({
        placeholderSrc: `photos/miniature/${id}`,
        src: `photos/display/${id}`,
      })
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
