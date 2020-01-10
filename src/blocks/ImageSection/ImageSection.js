import React from 'react'
import { Section } from '../Section/Section'
import { GridContainer, GridArea } from '../Grid/Grid'
import { ImageRow } from '../ImageRow/ImageRow'
import { FigCaption } from '../FigCaption/FigCaption'

import { useRect } from '@orioro/react-util'

export const ImageSection = ({
  imageRows,
  address,
  caption,
  Block,
}) => {
  return <Block
    type='Section'
    children={[
      {
        "type": "GridContainer",
        "tagName": "figure",
        "columns": [
          "repeat(12, 1fr)"
        ],
        "rows": ["auto"],
        "children": [
          {
            "type": "GridArea",
            "columnStart": 1,
            "columnEnd": 11,
            "children": imageRows.map((imageRow, index) => ({
              type: 'ImageRow',
              images: imageRow,
              targetHeight: .8 * window.innerHeight,
              style: {
                marginTop: index > 0 ? 20 : 0,
                justifyContent: 'center',
              }
            }))
          },
          {
            "type": "GridArea",
            "columnStart": 11,
            "columnEnd": 13,
            "style": {
              "display": "flex",
              "flexDirection": "column",
              "justifyContent": "flex-end"
            },
            "children": [
              {
                "type": "FigCaption",
                "address": address,
                "caption": caption
              }
            ]
          }
        ]
      }
    ]}
  />
}
