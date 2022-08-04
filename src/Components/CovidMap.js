import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { DataService } from "../Service/DataService";
import { MapUtils } from "../Utils/MapUtils";
import CovidCard from "./CovidCard";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function CovidMap(){
  const defaultProps = {
    center: {
      lat: 40,
      lng: -100
    },
    zoom: 6

  };

  // once the value of them is changed, it triggers updating/re-render
  // for class
//   state = {
//         zoomLevel: 6,
//         boundary: {},
//         points: {} // a JS object 
//   }
  // how it works?
  // useState() creates sth like above and set zoomLevle as 6
  // then it returns the variable and a function for setting the variable
  const [zoomLevel, setZoomLevel] = React.useState(6);
  const [boundary, setBoundary] = useState({});
  const [points, setPoints] = useState({});

  // For generating a list of cards that displays on current visible area (should be rendered) 
  const renderCovidPoints = function() {
    let result = [];
    // determine county(10-20) / state(5-9) / nation(1-4) level
    if (zoomLevel < 1 || zoomLevel > 20) { // sanity check
        return result;
    }
    let pointLevel = 'county';
    if (zoomLevel >= 1 && zoomLevel <= 4) {
        pointLevel = 'nation';
    }
    else if (zoomLevel > 4 && zoomLevel <= 9) {
        pointLevel = 'state';
    }
    const pointsToRender = points[pointLevel];
    // sanity check -> first time render this component, but points data not available
    // ？
    if (!pointsToRender) {
        return result;
    }

    if (pointLevel === 'county') {
        for (const point of pointsToRender) {
            if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                result.push(<CovidCard
                    lat={point.coordinates.latitude}
                    lng={point.coordinates.longitude}
                    subTitle={point.province}
                    title={point.county}
                    confirmed={point.status.confirmed}
                    deaths={point.status.deaths}
                />)
            }
        }
    }
    else if (pointLevel === 'state' ) {
        for (const state in pointsToRender) {  // iterate an object use "in"
            const point = pointsToRender[state];
            if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                result.push(<CovidCard
                    lat={point.coordinates.latitude}
                    lng={point.coordinates.longitude}
                    subTitle={point.country}
                    title={state}
                    confirmed={point.confirmed}
                    deaths={point.deaths}
                />)
            }
        }
    }
    else {
        for (const nation in pointsToRender) {  // iterate an object use "in"
            const point = pointsToRender[nation];
            if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                result.push(<CovidCard
                    lat={point.coordinates.latitude}
                    lng={point.coordinates.longitude}
                    title={nation}
                    confirmed={point.confirmed}
                    deaths={point.deaths}
                />)
            }
        }
    }
    return result;
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyABwfSM2bwlFqUvkBHHGMUQ26c57xe5fbw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        // this one will not be invoked in the first time 
        // so we do not have data after the map is shown first time
        // so we need a sanity check above.
        onGoogleApiLoaded = {
            () => {
                // goole map loaded -> call API to get covid data
                DataService.getAllCountyCases().then(response => {
                    
                    setPoints(MapUtils.convertCovidPoints(response.data));
                    
                }).catch(error => {
                    console.error(error);
                });
            }
        }
        // it is a callback function designed by google (could find in api reference)
        // an object containing those parameters is parsed by google react
        // 
        onChange = {
            ({center, zoom, bounds, marginBounds}) => {
                setZoomLevel(zoom);
                setBoundary(bounds);
            }
        }
      >
         {/* {} so we can write js code, call the function */}
        {renderCovidPoints()}
        
      </GoogleMapReact>
    </div>
  );

  
}