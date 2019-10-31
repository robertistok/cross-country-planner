import React, { useState } from "react";
import styled from "styled-components";

import Waypoint from "./Waypoint";

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

  const onDragStart = index => ev => {
    setDraggedItem(waypoints[index]);
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/html", ev.target.parentNode);
    ev.dataTransfer.setDragImage(ev.target.parentNode, 20, 20);
  };

  const onDragOver = index => () => {
    const draggedOverItem = waypoints[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let items = waypoints.filter(item => item !== draggedItem).slice();

    items.splice(index, 0, draggedItem);

    reorderWaypoints([...items.slice()]);
  };

  const onDragEnd = () => setDraggedItem(null);

  return (
    <Root>
      <Title>Route Builder</Title>
      <WaypointsContainer>
        {waypoints.map((waypoint, index) => (
          <Waypoint
            deleteWaypoint={handleWaypointDeletion(index)}
            key={index}
            index={index}
            handleDragEnd={onDragEnd}
            handleDragStart={onDragStart(index)}
            handleDragOver={onDragOver(index)}
          />
        ))}
      </WaypointsContainer>
      <DownloadButton>Download your Route</DownloadButton>
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

const DownloadButton = styled.button`
  color: #000;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 0px;
  background-color: #c3e451;
  width: 100%;
  border: none;
  border-radius: 2px;
`;

export default WaypointsList;
