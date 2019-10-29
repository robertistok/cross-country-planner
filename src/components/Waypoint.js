import React from "react";
import styled from "styled-components";

const Waypoint = ({ index, deleteWaypoint }) => {
  return (
    <Root>
      <Title>Waypoint {index + 1}</Title>
      <button onClick={deleteWaypoint}>Del</button>
    </Root>
  );
};

const Root = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export default Waypoint;
