/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2lrYXplIiwiYSI6ImNseGM1bW84bTNheGcydnM0MnY4c3k3bnkifQ.hwKorzj9k78VEB9ZFX4gog';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/gikaze/cl5p9a48100cr14nvcda8v93q', // style URL
    scrollZoom: false
    //center: [-74.5, 40], // starting position [lng, lat]
    //zoom: 9, // starting zoom
    //interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.map(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add a Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
