import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Progress } from 'antd'

const Progress5 = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 100) return
      setTime((ms) => ms + 2)
    }, 40)
    if (time === 100) clearInterval(interval)
    return () => clearInterval(interval)
  }, [])

  return <Progress type="circle" format={(p) => null} percent={time} width={50} />
}

Progress5.propTypes = {}

export default Progress5
