import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL from 'react-map-gl'

const mapAccess = {
	mapboxApiAccessToken: 'pk.eyJ1IjoiYW50b25pbjA2IiwiYSI6ImNrcTE5bWx4eTBjajkyc3FycXNrbWxhazEifQ.mnLB0CdJLi7WCb7flAVc6Q'
}

const mapStyle = {
	width: '100%',
	height: 600
}

const queryParams = {
	zoom: 8
}

export default function Test() {

const [viewport, setViewport] = useState({});

	// onSelected = (viewport, item) => {
	// 	this.setState({viewport});
	// 	console.log('Selected: ', item)
	// }
console.log(viewport);

	return (
		<div>
			<Geocoder
				{...mapAccess} onSelected={setViewport} onResult={console.log('oto')} viewport={viewport} hideOnSelect={true}
				queryParams={queryParams}
			/>

			<ReactMapGL
				{...mapAccess} {...viewport} {...mapStyle}
				onViewportChange={(newViewport) => setViewport({viewport: newViewport})}
			/>

		</div>
	);
}
