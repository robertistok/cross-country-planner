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
    </Root>
  );
};

const Root = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #383838
  color: #ffffff;
  overflow: auto;
  padding: 20px;
`;

const WaypointsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Title = styled.h1`
  margin-bottom: 50px;
`;

export default WaypointsList;
