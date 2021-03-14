/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { shape, number, string, func } from 'prop-types'
import Geocode from 'react-geocode'
// import useOutsideClick from 'utils/outsideClick'
import getCity from 'utils/getCity'
import WrappedMap from './components/Map'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY)
Geocode.enableDebug()

const Location = ({ setLocationVisibility, clearLocationField }) => {
  const locationRef = useRef(null)
  // useOutsideClick(locationRef, setLocationVisibility, 'localisation-name')

  const [coords, setCoords] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  const getPosition = async () => {
    await navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      (err) => setCoords({ latitude: 40.7484831, longitude: -73.9856715 }),
    )
  }

  const getGeoData = () => {
    Geocode.fromLatLng(coords.latitude, coords.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const city = getCity(addressArray)
        const coordinatesData = {
          city,
          lat: coords.latitude,
          lng: coords.longitude,
          address,
        }
        setCoordinates(coordinatesData)
        console.log('coordinatesData', coordinatesData)
      },
      (error) => {
        console.error(error)
      },
    )
  }

  useEffect(() => {
    getPosition()
  }, [])

  useEffect(() => {
    if (coords) getGeoData()
  }, [coords])

  const onMarketDragEnd = (event) => {
    const newLat = event.latLng.lat()
    const newLng = event.latLng.lng()
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const city = getCity(addressArray)

        const data = {
          city,
          lat: newLat,
          lng: newLng,
          address,
          autocompleteValue: response.results[0].formatted_address,
        }

        setCoordinates(data)
      },
      (error) => {
        console.error(error)
      },
    )
  }

  const onPlaceSelected = (place, element) => {
    const address = place.formatted_address || ''
    const addressArray = place.address_components || []
    const city = getCity(addressArray)
    const latValue = place.geometry ? place.geometry.location.lat() : 0
    const lngValue = place.geometry ? place.geometry.location.lng() : 0

    const data = {
      city,
      lat: latValue,
      lng: lngValue,
      address,
      autocompleteValue: element.value,
    }

    setCoordinates(data)
  }
  if (!coordinates) return <div />
  return (
    <div ref={locationRef}>
      <WrappedMap
        // eslint-disable-next-line max-len
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&language=en`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div className="location-map" />}
        mapElement={
          <div
            style={{
              height: 'calc(100% - 57px)',
              border: '3px solid #fff',
              borderRadius: '20px',
              position: 'absolute',
              top: '50px',
              left: '0',
              width: '100%',
            }}
          />
        }
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        setLocationVisibility={setLocationVisibility}
        onMarketDragEnd={onMarketDragEnd}
        onPlaceSelected={onPlaceSelected}
        clearLocationField={clearLocationField}
      />
    </div>
  )
}

Location.propTypes = {
  coordinates: shape({
    city: string,
    lat: number,
    lng: number,
    address: string,
    autocompleteValue: string,
  }),
  setLocationVisibility: func,
  setCoordinates: func,
  clearLocationField: func,
}

export default Location
