import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Geocoder from 'react-map-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pbjA2IiwiYSI6ImNrcTE5bWx4eTBjajkyc3FycXNrbWxhazEifQ.mnLB0CdJLi7WCb7flAVc6Q';

export default function Test() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);
	const [query, setQuery] = useState([]);
	const mapRef = useRef();

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
	});

	return (
		<div>
			<Geocoder
				mapRef={mapRef}
				mapboxApiAccessToken={mapboxgl.accessToken}
			/>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}
