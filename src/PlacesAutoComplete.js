import React, { useRef, useEffect, useState } from 'react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import ReactMapGL, {Marker} from 'react-map-gl';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW50b25pbjA2IiwiYSI6ImNrcTE5bWx4eTBjajkyc3FycXNrbWxhazEifQ.mnLB0CdJLi7WCb7flAVc6Q';


const PlacesAutocomplete = () => {
	const [viewport, setViewport] = useState({
		latitude: 48.866667,
		longitude: 2.333333,
		zoom: 9,
	});

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		// When user clicks outside of the component, we can dismiss
		// the searched suggestions by calling this method
		clearSuggestions();
	});

	const handleInput = (e) => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};


	const handleSelect =
		({ description }) =>
			() => {
				// When user selects a place, we can replace the keyword without request data from API
				// by setting the second parameter to "false"
				setValue(description, false);
				clearSuggestions();

				// Get latitude and longitude via utility functions
				getGeocode({ address: description })
					.then((results) =>
						getLatLng(results[0]),
					)
					.then((result) => {
						// console.log("📍 Coordinates: ", { lat, lng });
						console.log(result);
						setViewport({
							...viewport,
							longitude: result.lng,
							latitude: result.lat,
							zoom: 12,
						});
					})
					.catch((error) => {
						console.log("😱 Error: ", error);
					});

			};
	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});



	return (
		<div>
			<div ref={ref}>
				<input
					value={value}
					onChange={handleInput}
					disabled={!ready}
					placeholder="Where are you going?"
				/>
				{/* We can use the "status" to decide whether we should display the dropdown or not */}
				{status === "OK" && <ul>{renderSuggestions()}</ul>}
			</div>
			<div style={{ height: "50vh" }}>
				<ReactMapGL
					mapboxApiAccessToken={MAPBOX_TOKEN}
					mapStyle="mapbox://styles/mapbox/streets-v11"
					{...viewport}
					width="100%"
					height="100%"
					onViewportChange={setViewport}
					dragPan={false}
				>
					<Marker longitude={viewport.longitude} latitude={viewport.latitude} offsetLeft={0} offsetTop={-30} >
						<span style={{color: 'red'}}>
							<i className="fas fa-map-marker-alt fa-2x"></i>
						</span>
					</Marker>
				</ReactMapGL>
			</div>
			{/*<div ref={mapContainer} className="map-container" />*/}
		</div>
	);
};
export default PlacesAutocomplete;
