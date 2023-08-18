import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { MainPage } from "../pages/main.page";

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
            <MainPage />
        }
      />
    </ReactRouterRoutes>
  );
};

export { Routes };