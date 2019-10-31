import React from "react";
import styled from "styled-components";
import { FaBars, FaTrash } from "react-icons/fa";

const Waypoint = ({
  index,
  deleteWaypoint,
  handleDragStart,
  handleDragEnd,
  handleDragOver
}) => {
  return (
    <Root onDragOver={handleDragOver}>
      <span draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <StyledFaBars color="#616161" />
      </span>

      <Title>Waypoint {index + 1}</Title>
      <StyledFaTrash color="#616161" onClick={deleteWaypoint} />
    </Root>
  );
};

const Root = styled.li`
  margin-bottom: 25px;
  list-style: none;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: auto;
`;

const StyledFaBars = styled(FaBars)`
  margin-right: 10px;
  cursor: pointer;
`;

const StyledFaTrash = styled(FaTrash)`
  cursor: pointer;
`;

export default Waypoint;
