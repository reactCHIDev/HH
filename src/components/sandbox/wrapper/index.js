/* eslint-disable max-len */
import React, { useState } from 'react'
import Uploader from 'components/sandbox'

const Wrapper = () => {
  const [fileList, setFilelist] = useState([
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/1eb039e8-2c66-4b5b-817b-76eb2d0c3e52_1606652319476_Rectangle 545.jpg',
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/5acc0db9-4202-4cca-8eea-ba8be5a1199d_1606652331745_Rectangle 546.jpg',
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/714587b1-1793-4e7d-a06d-54658e13319d_1606652344533_cover.jpg',
  ])
  const [cover, setCover] = useState(0)

  return <Uploader list={fileList} listSet={setFilelist} cover={cover} setCover={setCover} />
}

export default Wrapper
