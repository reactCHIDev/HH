const isProductAvailable = (product) => {
  const { quantity, status, available, availabilityStartDate, availabilityEndDate } = product
  const time = new Date(Date.now()).getTime()
  const endTime = new Date(availabilityEndDate).getTime()
  const startTime = new Date(availabilityStartDate).getTime()
  if (quantity === 0) return false
  if (status === 'PAUSED') return false
  if (available === 'Preorder' && time > startTime && time < endTime) {
    return false
  }
  return true
}

export default isProductAvailable
