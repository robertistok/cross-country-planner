import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import L from "leaflet";

import { useAppStateValue } from "./AppState";
import usePrevious from "../hooks/usePrevious";

const getWaypointIcon = ({ label }) =>
  new L.DivIcon({
    className: "custom-pin",
    html: `<span>${label}</span>`
  });

const Map = () => {
  const [{ map, waypoints }, { initMap, addWaypoint }] = useAppStateValue();
  const prevWaypoints = usePrevious(waypoints) || [];

  const handleMapClick = useCallback(
    ev => {
      const { lat, lng } = map.mouseEventToLatLng(ev.originalEvent);
      const marker = new L.marker([lat, lng], {
        icon: getWaypointIcon({ label: waypoints.length + 1 })
      }).addTo(map);
      addWaypoint(marker);
    },
    [addWaypoint, map, waypoints.length]
  );

  const clearMapOfPolylines = useCallback(
    () =>
      Object.values(map._layers).forEach(layer => {
        if (layer._path !== undefined) {
          try {
            map.removeLayer(layer);
          } catch (e) {
            console.log("problem with " + e + layer);
          }
        }
      }),
    [map]
  );
  useEffect(() => {
    if (!map) {
      const mapInstance = new L.map("map").setView([46.3342, 13.8287], 13);

      new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      initMap(mapInstance);
    }
  }, [initMap, map]);

  useEffect(() => {
    if (
      waypoints.length !== prevWaypoints.length ||
      waypoints !== prevWaypoints
    ) {
      if (map) {
        clearMapOfPolylines();
      }

      if (
        waypoints.length < prevWaypoints.length ||
        waypoints !== prevWaypoints
      ) {
        waypoints.forEach((wp, index) =>
          wp.setIcon(getWaypointIcon({ label: index + 1 }))
        );
      }

      if (waypoints.length >= 2) {
        new L.polyline(waypoints.map(w => w.getLatLng()), {
          color: "#1b57d1"
        }).addTo(map);
      }
    }
  }, [
    clearMapOfPolylines,
    map,
    prevWaypoints,
    prevWaypoints.length,
    waypoints
  ]);

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }

    return () => {
      if (map) {
        map.off("click");
      }
    };
  });

  return <Root id="map" />;
};

const Root = styled.div`
  height: 100%;

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

export default Map;
