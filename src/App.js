import React, { Component } from 'react';
import { InfoWindow, Marker, Map, GoogleApiWrapper, Polygon } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const triangleCoords = [
      { lat: 43.7046, lng: -72.2943 },
      { lat: 43.7034, lng: -72.2886 },
      { lat: 43.7091, lng: -72.2839 },
      { lat: 43.7074, lng: -72.2911 }, //choates
      { lat: 43.7066, lng: -72.2968 }, //ledyard
      { lat: 43.7030, lng: -72.2841 }, //gym
      { lat: 43.7046, lng: -72.2943 }
    ];
    return (
      <div>
        <h1>Hello Google Maps</h1>
        <Map
          initialCenter={{
            lat: 43.713,
            lng: -72.287
          }}
          zoom={16}
          google={this.props.google}
        >
          <Marker
            name={'This is a first marker!'}
            position={{ lat: 43.712, lng: -72.284 }}
            onClick={this.onMarkerClick}
          />
          <Marker
            name={'This is a second marker'}
            position={{ lat: 43.742, lng: -72.214 }}
            onClick={this.onMarkerClick}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
            </div>
          </InfoWindow>
          <Polygon
            paths={triangleCoords}
            strokeColor="#670A66"
            strokeOpacity={0.6}
            strokeWeight={4}
            fillColor="#670A66"
            fillOpacity={0.30}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCJ1fU6s9j1RIE_oaer3QgSpQgXpaekqxI'
})(MapContainer);