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
import {TablaUsuarios} from "./componentes/usuarios/tablaUsuarios";
import {RecuperarContraseña} from "./pages/recuperarContraseña/recuperarContraseña"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
  },{
    path: "/usuariotb",
    element: <TablaUsuarios />,
    errorElement: <Error />,
  },{
    path: "/recuperarPass",
    element: <RecuperarContraseña />,
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
