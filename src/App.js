import React from "react";
import styled from "styled-components";

import { AppStateProvider } from "./components/AppState";
import WaypointsList from "./components/WaypointsList";
import Map from "./components/Map";

const App = () => {
  return (
    <AppStateProvider>
      <Root>
        <WaypointsList />
        <Map />
      </Root>
    </AppStateProvider>
  );
};

const Root = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
`;

export default App;
