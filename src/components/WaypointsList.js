import React, { useState } from "react";
import styled from "styled-components";

import Waypoint from "./Waypoint";
import GpxDownloaderButton from "./GpxDownloaderButton";

import { useAppStateValue } from "./AppState";

const WaypointsList = () => {
  const [
    { waypoints, map },
    { deleteWaypoint, reorderWaypoints }
  ] = useAppStateValue();
  const [draggedItem, setDraggedItem] = useState(null);

  const handleWaypointDeletion = waypointIndex => () => {
    const marker = waypoints.find((w, index) => index === waypointIndex);
    deleteWaypoint(waypointIndex);
    map.removeLayer(marker);
  };

  const handleDragStart = index => ev => {
    setDraggedItem(waypoints[index]);
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/html", ev.target.parentNode);
    ev.dataTransfer.setDragImage(ev.target.parentNode, 20, 20);
  };

  const handleDragOver = index => () => {
    const draggedOverItem = waypoints[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let items = waypoints.filter(item => item !== draggedItem).slice();

    items.splice(index, 0, draggedItem);

    reorderWaypoints([...items.slice()]);
  };

  const handleDragEnd = () => setDraggedItem(null);

  return (
    <Root>
      <Title>Route Builder</Title>
      <WaypointsContainer>
        {waypoints.map((waypoint, index) => (
          <Waypoint
            deleteWaypoint={handleWaypointDeletion(index)}
            key={index}
            index={index}
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart(index)}
            handleDragOver={handleDragOver(index)}
          />
        ))}
      </WaypointsContainer>
      {waypoints.length > 0 && <GpxDownloaderButton />}
    </Root>
  );
};

const Root = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #383838
  color: #ffffff;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    height: 0.5em;
    border-top: 4px solid #616161;
  }
`;

const WaypointsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 500px;
  overflow: auto;
`;

export default WaypointsList;
