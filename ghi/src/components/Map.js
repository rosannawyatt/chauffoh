import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "../itinerary.css";

export default function Map(props) {
  const center = [37.7749, -122.4194];

  const start = props.start;
  const end = props.end;

  const CreateRoutineMachineLayer = () => {
    const start_lat = start[0];
    const start_lon = start[1];
    const end_lat = end[0];
    const end_lon = end[1];

    const instance = L.Routing.control({
      waypoints: [L.latLng(start_lat, start_lon), L.latLng(end_lat, end_lon)],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    });

    return instance;
  };

  const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

  return (
    <>
      <div style={{ height: "75vh" }}>
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={center}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RoutingMachine />
        </MapContainer>
      </div>
    </>
  );
}
