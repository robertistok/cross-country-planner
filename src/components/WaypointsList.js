import React from "react";
import styled from "styled-components";

import Waypoint from "./Waypoint";

import { useAppStateValue } from "./AppState";

const WaypointsList = () => {
  const [{ waypoints, map }, { deleteWaypoint }] = useAppStateValue();

  const handleWaypointDeletion = waypointIndex => () => {
    const marker = waypoints.find((w, index) => index === waypointIndex);
    deleteWaypoint(waypointIndex);
    map.removeLayer(marker);
  };

  return (
    <Root>
      <Title>Route Builder</Title>
      <WaypointsContainer>
        {waypoints.map((waypoint, index) => (
          <Waypoint
            deleteWaypoint={handleWaypointDeletion(index)}
            key={index}
            index={index}
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

const WaypointsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 50px;
`;

export default WaypointsList;
