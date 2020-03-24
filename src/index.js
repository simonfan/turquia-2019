import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App/App'
// import { PhotoGallery } from './components/PhotoGallery/PhotoGallery'
import 'normalize.css/normalize.css'
import './index.scss'

// import SECTIONS from './data/sections.js'

import SECTIONS_01 from './data/sections-01-mar-negro'
import SECTIONS_02 from './data/sections-02-ankara'
import SECTIONS_03 from './data/sections-03-capadoccia'
import SECTIONS_04 from './data/sections-04-konya'
import SECTIONS_05 from './data/sections-05-istanbul'
import IMAGES from './data/images.json'

const parseSections = sections => sections.map(section => (section.type === 'image-section'
  ? {
    ...section,
    imageRows: section.imageRows.map(rowImages => rowImages.map(image => ({
      ...image,
      aspectRatio: IMAGES[image.id].aspectRatio,
      // data: IMAGES[image.id],
    })))
  } : section
))

ReactDOM.render(
  <App
    galleries={[
      ['01-mar-negro', parseSections(SECTIONS_01)],
      ['02-ankara', parseSections(SECTIONS_02)],
      ['03-capadoccia', parseSections(SECTIONS_03)],
      ['04-konya', parseSections(SECTIONS_04)],
      ['05-istanbul', parseSections(SECTIONS_05)]
    ]}
  />,
  document.getElementById('root')
)
