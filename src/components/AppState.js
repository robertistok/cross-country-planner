import React, { createContext, useContext, useReducer } from "react";

const INIT_MAP = "initMap";
const ADD_WAYPOINT = "addWaypoint";
const DELETE_WAYPOINT = "deleteWaypoint";
const REORDER_WAYPOINTS = "reorderWaypoints";

const useAppState = () => {
  const initialState = { map: undefined, waypoints: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case INIT_MAP:
        return { ...state, map: action.payload };
      case ADD_WAYPOINT:
        return { ...state, waypoints: [...state.waypoints, action.payload] };

      case DELETE_WAYPOINT:
        return {
          ...state,
          waypoints: state.waypoints.filter(
            (w, index) => index !== action.payload
          )
        };
      case REORDER_WAYPOINTS:
        return { ...state, waypoints: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const initMap = mapInstance =>
    dispatch({ type: INIT_MAP, payload: mapInstance });
  const addWaypoint = waypoint =>
    dispatch({ type: ADD_WAYPOINT, payload: waypoint });
  const deleteWaypoint = index =>
    dispatch({ type: DELETE_WAYPOINT, payload: index });
  const reorderWaypoints = newWaypoints =>
    dispatch({ type: REORDER_WAYPOINTS, payload: newWaypoints });

  return [state, { initMap, addWaypoint, deleteWaypoint, reorderWaypoints }];
};

export const AppStateContext = createContext();

export const AppStateProvider = ({ rowsCount, columnsCount, children }) => (
  <AppStateContext.Provider value={useAppState()}>
    {children}
  </AppStateContext.Provider>
);
export const useAppStateValue = () => useContext(AppStateContext);
