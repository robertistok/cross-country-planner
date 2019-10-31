import React, { useState } from "react";
import styled from "styled-components";
import createGpx from "gps-to-gpx";
import { useAppStateValue } from "./AppState";

const GpxDownloaderButton = () => {
  const [{ waypoints }] = useAppStateValue();
  const [gpx, setGpx] = useState(null);

  const handleDownload = () => {
    const gpxFromLatLng = createGpx(waypoints.map(wp => wp.getLatLng()), {
      activityName: "Cross county rocks!",
      latKey: "lat",
      lonKey: "lng"
    });

    setGpx(
      `data:application/javascript;charset=utf-8,${encodeURIComponent(
        gpxFromLatLng
      )}`
    );
  };

  return (
    <Root onClick={handleDownload} disabled={waypoints.length === 0}>
      {waypoints.length === 0 ? (
        "Download your Route"
      ) : (
        <a
          download={`letsgoandrun-${new Date().getTime()}.gpx`}
          href={gpx}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download your Route
        </a>
      )}
    </Root>
  );
};

const Root = styled.button`
  color: #000;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 0px;
  background-color: #c3e451;
  width: 100%;
  border: none;
  border-radius: 2px;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export default GpxDownloaderButton;
