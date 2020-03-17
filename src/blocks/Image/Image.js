import React, { useContext } from 'react'
import { DataContext } from '../../components/DataContext/DataContext'
import LazyLoad from 'react-lazyload'
import pick from 'lodash/pick'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const Image = ({
  Block,
  onLoad,
  ...props
}) => {
  const { resolveImageUrls } = useContext(DataContext)
  const { src, placeholderSrc } = resolveImageUrls(props)

  return <LazyLoad
    placeholder={<img
      {...props}
      src={placeholderSrc}
    />}
    once
    offset={200}>
    <Zoom
      overlayBgColorEnd='rgba(0, 0, 0, 0.95)'>
      <img
        {...props}
        src={src}
        onLoad={onLoad}
      />
    </Zoom>
  </LazyLoad>
}
