import React from "react";
import { useRoutes } from "react-router-dom";
import Presentation from "./page/presentation";
import Candidatos from "./page/candidatos";
import RealizarVoto from "./page/realizar-voto";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Presentation />,
    },
    {
      path: "/candidatos",
      element: <Candidatos />,
    },
    {
      path: "/realizar-voto",
      element: <RealizarVoto />,
    },
  ]);
};

export default Routes;
