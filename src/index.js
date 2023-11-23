import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//paginas
import { Error } from "./pages/error/error404";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Registro } from "./pages/registro/registro";
import { RegistroPasodos } from "./pages/registro/registroPasodos";
import { Dashboard } from "./pages/administracion/dashboard";
import { TablaUsuarios } from "./componentes/usuarios/tablaUsuarios";
import Categorias from "./componentes/categoriasVideos/categproas";
import { RecuperarContraseña } from "./pages/recuperarContraseña/recuperarContraseña";
import { FullScrean } from "./componentes/fullScreen/fullScreen";
import { FullScreanSeriesEspeciales } from "./componentes/fullScreenSeriesEspeciales/fullScreenSeriesEspeciales";
import { FullCapitulos } from "./componentes/fullCapitulos/fullCapitulos";
import { FullPeliculas } from "./componentes/fullScreenPeliculas/fullScreenPeliculas";
import { FullDocumentales } from "./componentes/fullScreenDocumentales/FullScreenDocumentales";
import { FullEspeciales } from "./componentes/fullScreenEspeciales/fullScreenEspeciales";
import { SwiperPatrocinadores } from "./componentes/swiperPatrocinadores/swPatrocinadores";
import { GuelaguetzaFull } from "./componentes/fullGuela/fullGuela";
import { Home2 } from "./pages/home/home2";
import { FullVideoHeader } from "./componentes/fullScreenheade/fullscreenheader";
import { PoliticaPrivacidad } from "./pages/registro/politicaPrivcidad";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "home",
    element: <Home2 />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/politicaPrivacidad",
    element: <PoliticaPrivacidad />,
    errorElement: <Error />,
  },
  {
    path: "/categorias",
    element: <Categorias />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <Error />,
  },
  {
    path: "/registroPasodos",
    element: <RegistroPasodos />,
    errorElement: <Error />,
  }, {
    path: "/usuariotb",
    element: <TablaUsuarios />,
    errorElement: <Error />,
  }, {
    path: "/recuperarPass",
    element: <RecuperarContraseña />,
    errorElement: <Error />,
  },
  {
    path: "/series",
    element: <FullScrean />,
    errorElement: <Error />,
  },
  {
    path: "/seriesEspeciales",
    element: <FullScreanSeriesEspeciales />,
    errorElement: <Error />,
  },
  {
    path: "/capitulos",
    element: <FullCapitulos />,
    errorElement: <Error />,
  },
  {
    path: "/peliculas",
    element: <FullPeliculas />,
    errorElement: <Error />,
  },
  {
    path: "/documentales",
    element: <FullDocumentales />,
    errorElement: <Error />,
  },
  {
    path: "/eventosEspeciales",
    element: <FullEspeciales />,
    errorElement: <Error />,
  },
  {
    path: "/patrocinadores",
    element: <SwiperPatrocinadores/>,
    errorElement: <Error />,
  },
  ,
  {
    path: "/epecialGuelaguetzaguetza",
    element: <GuelaguetzaFull/>,
    errorElement: <Error />,
  },
  {
    path: "/enVivo",
    element: <FullVideoHeader/>,
    errorElement: <Error />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
