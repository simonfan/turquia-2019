const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const sharp = require('sharp')
const mkdirp = promisify(require('mkdirp'))

const readdir = promisify(fs.readdir)

const SRC_DIR = path.join(__dirname, '../../turquia-selecao')
const OUT_DIR = path.join(__dirname, '../public/photos')

const generateImages = async imageName => {
  const imagePath = path.join(SRC_DIR, imageName)

  const image = sharp(imagePath).rotate()

  return Promise.all([
    // Full
    image
      .clone()
      .toFile(path.join(OUT_DIR, 'full', imageName)),
    // Miniature
    image
      .clone()
      .resize({ width: 50, height: 50, fit: 'inside' })
      .toFile(path.join(OUT_DIR, 'miniature', imageName)),
    // Display
    image
      .clone()
      .resize({ width: 2500, height: 2500, fit: 'inside' })
      .toFile(path.join(OUT_DIR, 'display', imageName))
  ])

}

const prepareImages = async () => {
  await Promise.all([
    mkdirp(path.join(OUT_DIR, 'full')),
    mkdirp(path.join(OUT_DIR, 'miniature')),
    mkdirp(path.join(OUT_DIR, 'display')),
  ])

  const images = await readdir(SRC_DIR)

  return images.reduce((prev, image) => prev.then(() => {
    const imagePath = path.join(SRC_DIR, image)

    return generateImages(image)
      .then(() => console.log(`prepared ${image}`))
  }), Promise.resolve())
}

prepareImages()
