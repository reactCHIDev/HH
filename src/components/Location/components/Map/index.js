import React, { useState } from 'react'
import { shape, number, string, func } from 'prop-types'
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from 'react-google-maps'
import Autocomplete from 'react-google-autocomplete'
import mapStyles from './mapStyles'

const Map = ({
  coordinates,
  onMarketDragEnd,
  onPlaceSelected,
  setCoordinates,
  setLocationVisibility,
  clearLocationField,
}) => {
  const [marker, setMarker] = useState(null)

  const handleAutocoplete = (e) => {
    const data = {
      city: coordinates.city,
      lat: coordinates.lat,
      lng: coordinates.lng,
      address: coordinates.address,
      autocompleteValue: e.target.value,
    }

    setCoordinates(data)
  }

  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{
        lat: coordinates.lat,
        lng: coordinates.lng,
      }}
      center={{
        lat: coordinates.lat,
        lng: coordinates.lng,
      }}
      defaultOptions={{ styles: mapStyles }}
    >
      <div className="location-map__content">
        <Autocomplete
          className="location-map__content-input"
          placeholder="Enter a location or drop a pin below"
          onPlaceSelected={onPlaceSelected}
          types={['(regions)']}
          onChange={handleAutocoplete}
          value={coordinates.autocompleteValue}
        />
        <div className="location-map__content-clear" onClick={clearLocationField}>
          clear
        </div>
        <div className="location-map__content-close" onClick={setLocationVisibility} />
      </div>
      <Marker
        draggable
        onDragEnd={onMarketDragEnd}
        position={{
          lat: coordinates.lat,
          lng: coordinates.lng,
        }}
        onClick={() => {
          setMarker(coordinates)
        }}
      />
      {marker && (
        <InfoWindow
          position={{
            lat: coordinates.lat,
            lng: coordinates.lng,
          }}
          onCloseClick={() => {
            setMarker(null)
          }}
        >
          <div>{coordinates.address}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

Map.propTypes = {
  coordinates: shape({
    city: string,
    lat: number,
    lng: number,
    address: string,
    autocompleteValue: string,
  }),
  onMarketDragEnd: func,
  onPlaceSelected: func,
  setCoordinates: func,
  setLocationVisibility: func,
  clearLocationField: func,
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
