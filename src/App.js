import './App.css';
import React, { useState, useRef, useCallback } from 'react';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW50b25pbjA2IiwiYSI6ImNrcTE5bWx4eTBjajkyc3FycXNrbWxhazEifQ.mnLB0CdJLi7WCb7flAVc6Q';

function App() {
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState([]);
    const [query, setQuery] = useState([]);
    const [viewport, setViewport] = useState({
    latitude: undefined,
    longitude: undefined,
    zoom: 8,
    });
    const mapRef = useRef();





    const api = {
        key: "b51860d2f2812bd91529f76e2b3d3d70",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const search = async () => {
            await fetch(`${api.base}weather?lat=${viewport.latitude}&lon=${viewport.longitude}&units=metric&APPID=${api.key}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Une erreur s'est produite");
                    }
                    return res.json();
                })
                .then((res) => {
                    // setCurrent(res);
                    console.log(res);
                })
                .catch(() => {
                    setError(true);
                });
        };
        console.log(query.result.id, 'query');
  return (
    <div className="App">

        <div style={{ height: "50vh" }}>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"

                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={setQuery}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    flyTo={true}
                    onResult={setQuery}
                />
            </MapGL>

            {/*<span>{current.id}</span>*/}
        </div>
    </div>
  );
}

export default App;
