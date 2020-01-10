import React, { useContext } from 'react'
import { DataContext } from '../../components/DataContext/DataContext'
import LazyLoad from 'react-lazyload'
import pick from 'lodash/pick'

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
    />}>
    <img
      {...props}
      src={src}
      onLoad={onLoad}
    />
  </LazyLoad>
}
