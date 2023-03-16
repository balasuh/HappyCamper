const coordinates = JSON.parse(coordinatesJSON);
const campgroundTitle = JSON.parse(campgroundTitleJSON);
const campgroundLocation = JSON.parse(campgroundLocationJSON);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    // center: [-74.5, 40], // starting position [lng, lat]
    center: coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campgroundTitle}</h3><p>${campgroundLocation}</p>`
            )
    )
    .addTo(map)