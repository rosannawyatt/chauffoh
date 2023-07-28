##### [<-- Back To Main](../README.md)

# Intergrations

We intergrated LeafLet third-party api service for mapping of the users desired ride location. The location data is passed from ride creation form and turned into lat / long and sent to LeafLet. Leaflet returns those locations on the map with driving direction information.

Three third-party APIS were integrated, React Leaflet, Leaflet Routing Machine, and Geocode from maps.

## React Leaflet

URL: https://react-leaflet.js.org/docs/api-map/

The React Leaflet API is used to create a world map. The map is specified in a <MapContainer/> and the map skin is specified by the tile layer. Tile layer was provided in the setup on the official website. A center point is specified in San Francisco because that is the decided base location of our app.

## Leaflet Routing Machine

URL: https://www.liedman.net/leaflet-routing-machine/

Built to implement routing onto a leaflet map. After a leaflet map has been setup we can define a route based on latitude and longitutde coodrinates using the L.Routing.Control function. Allows us to specify a variety of settings.

##  Geocode by Maps

URL:  https://geocode.maps.co/

Simple Geocode API. Input an address, get coordinates. Used to translate start and end locations in our ride model to latitude and longitude lines. These coordinates are then fed into our leaflet routing machine function to create a route on our map.
