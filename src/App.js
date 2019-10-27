import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import L from "leaflet";

function App() {
  // const [map, setMap] = useState();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!map) {
      const mapInstance = new L.map("map").setView([46.3342, 13.8287], 13);

      new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [map]);

  const addMarker = useCallback(
    ev => {
      const { lat, lng } = map.mouseEventToLatLng(ev.originalEvent);
      L.marker([lat, lng], {
        icon: new L.DivIcon({
          className: "custom-pin",
          html: `<span>${markers.length + 1}</span>`
        })
      }).addTo(map);
      setMarkers(prev => [...prev, { lat, lng }]);
    },
    [map, markers.length]
  );

  useEffect(() => {
    if (markers.length >= 2) {
      new L.polyline(markers, { color: "#1b57d1" }).addTo(map);
    }
  });

  useEffect(() => {
    if (map) {
      map.on("click", addMarker);
    }

    return () => {
      if (map) {
        map.off("click");
      }
    };
  });

  console.log(map);

  return (
    <div className="App">
      <MapContainer id="map"></MapContainer>
    </div>
  );
}

const MapContainer = styled.div`
  height: 500px;

  .custom-pin {
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    height: 24px !important;
    width: 24px !important;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
`;

export default App;
