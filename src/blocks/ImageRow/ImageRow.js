import React, { useState, useRef, useEffect } from 'react'
import { HtmlTag } from '../HtmlTag/HtmlTag'

import { useRect } from '@orioro/react-util'

const calculateImageDimensions = ({
  aspectRatios = [],
  availableWidth = 1000,
  targetHeight = 200,
  gap = 20,
}) => {
  const sameHeightWidths = aspectRatios.map(({ width, height }) => (targetHeight / height) * width)

  const totalSize = sameHeightWidths.reduce((acc, width) => acc + width, 0) + (aspectRatios.length - 1) * gap

  const multiplier = totalSize > availableWidth
    ? availableWidth / totalSize
    : 1

  return sameHeightWidths.map((w, index) => {
    const aspectRatio = aspectRatios[index]
    const width = w * multiplier
    const height = width * (aspectRatio.height / aspectRatio.width)

    return {
      width,
      height
    }
  })
}

export const ImageRow = ({
  images,
  targetHeight = 200,
  gap = 20,
  style = {},
  direction = 'ltr',
  defaultAspectRatio = {
    width: 1,
    height: 1
  },
  Block,

  ...props
}) => {
  const containerRef = useRef(null)

  const [aspectRatios, setImageAspectRatios] = useState(
    images.map(({ aspectRatio }) => aspectRatio || {...defaultAspectRatio, isProvisional: true })
  )


  const [imageDimensions, setImageDimensions] = useState(null)
  const { width, height } = useRect(containerRef)

  useEffect(() => {
    if (aspectRatios && width && height) {
      setImageDimensions(calculateImageDimensions({
        aspectRatios,
        availableWidth: width,
        targetHeight: height,
        gap,
      }))
    }
  }, [aspectRatios, width, height])

  const marginCSSKey = direction === 'ltr' ? 'marginLeft' : 'marginRight'

  return <HtmlTag
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      ...style,
      height: imageDimensions
        ? Math.min(imageDimensions[0].height, targetHeight)
        : targetHeight,
    }}
    ref={containerRef}>
    {imageDimensions && images.map(({ style = {}, type, ...imageProps}, index) => <Block
      {...imageProps}
      key={index}
      type={type ? type : 'Image'}
      style={index > 0 ? {
        ...style,
        [marginCSSKey]: gap,
      } : style}
      width={imageDimensions[index].width}
      height={imageDimensions[index].height}
      onLoad={e => {
        if (aspectRatios[index].isProvisional) {
          setImageAspectRatios([
            ...aspectRatios.slice(0, index),
            {
              width: e.target.naturalWidth,
              height: e.target.naturalHeight
            },
            ...aspectRatios.slice(index + 1)
          ])
        }
      }}
    />)}
  </HtmlTag>
}
