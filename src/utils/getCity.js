const getCity = (addressArray) => {
  let data = null
  if (addressArray) {
    data = addressArray.find(
      ({ types }) => types[0] === 'locality' || types[0] === 'administrative_area_level_1',
      // types[0] === 'administrative_area_level_2',
    )
  }

  return data ? data.long_name : 'Unknown'
}

export default getCity
