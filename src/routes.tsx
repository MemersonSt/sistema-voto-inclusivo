import React from "react";
import { useRoutes } from "react-router-dom";
import Presentation from "./page/presentation";
import Candidatos from "./page/candidatos";
import RealizarVoto from "./page/realizar-voto";
import Instrucciones from "./page/instrucciones";
import HeaderComp from "./design-component/header_comp";
import Resultados from "./page/resultados";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Presentation />,
    },
    {
      path: "/elecciones",
      element: <HeaderComp />,
      children: [
        {
          path: "instrucciones",
          element: <Instrucciones />,
        },
        {
          path: "candidatos",
          element: <Candidatos />,
        },
        {
          path: "votacion",
          element: <RealizarVoto />,
        },
        {
          path: "resultados",
          element: <Resultados />,
        },
      ],
    },
  ]);
};

export default Routes;
