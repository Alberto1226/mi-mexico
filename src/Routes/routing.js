//importamos paginas
import React from 'react'
import {Home} from '../pages/home/home'
import {Login} from '../pages/login/login'
import {Registro} from '../pages/registro/registro'
import {Error} from '../pages/error/error404'
import { createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: '/',
        Element: <Home/>,
        errorElement: <Error/>,
    },
    {
        path: '/login',
        Element: <Login/>,
        errorElement: <Error/>,
    },
    {
        path: '/registro',
        Element: <Registro/>,
        errorElement: <Error/>,
    },
]);

export default router;