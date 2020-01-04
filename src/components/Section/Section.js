import React from 'react'
import LazyLoad from 'react-lazyload'
import './Section.scss'

const Image = ({ className, placeholderSrc, src, alt }) => <LazyLoad
  placeholder={<img
    className={className}
    src={placeholderSrc}
  />}>
  <img
    className={className}
    src={src}
    alt={alt}
  />
</LazyLoad>

export const Section = ({
  imageRows,
  address,
  caption
}) => (<section className='Section'>
  <figure>
    <div>
      {imageRows.map((imageRow, index) => (<div
        key={index}
        className={`ImageRow ImageRow--${imageRow.length}`}>
        {imageRow.map(({ id, orientation }, index) => <Image
          key={index}
          className={`ImageRowImage ImageRowImage--${orientation}`}
          placeholderSrc={`photos/miniature/${id}`}
          src={`photos/display/${id}`}
          alt={address && caption
                ? `${address} - ${caption}`
                : address
                  ? address
                  : caption
          }
        />)}
      </div>))}
    </div>
    <figcaption>
      {address ? <address>{address}</address> : null}
      {caption ? <div>{caption}</div> : null}
    </figcaption>
  </figure>
</section>)
