import terrainAtlas from 'assets/terrain.png'
import sprites from '../../configs/sprites'
import worldConfig from './world.json'

const processWorld = ({ ctx }) => {
  const terrainImg = document.createElement('img')
  terrainImg.src = terrainAtlas

  const sprite = {
    w: 48,
    h: 48,
  }

  const renderWorld = () => {
    const { map: worldMap } = worldConfig
    const { terrain } = sprites

    worldMap.forEach((row, y) => {
      row.forEach((cell, x) => {
        const [terrainSprite] = cell
        const [spriteCoords] = terrain[terrainSprite].frames
        // const [sX, sY, sW, sH] = spriteCoords

        ctx.drawImage(terrainImg, ...spriteCoords, x * sprite.w, y * sprite.h, sprite.w, sprite.h)
      })
    })

    window.requestAnimationFrame(renderWorld)
  }

  terrainImg.addEventListener('load', () => {
    window.requestAnimationFrame(renderWorld)
  })
}

export default processWorld
