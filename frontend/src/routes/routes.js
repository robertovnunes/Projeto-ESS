import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Reservainicio from "../pages/reservaInicio";
import Reservas from "../pages/reserva/reservaEquipamento"

const router = createBrowserRouter([

    {path: "/", element: <App/>},
    {path: "/reservaEquipamento", element: <Reservainicio/>},
    {path: "/reservaEquipamento/equipamentos", element: <Reservas/>}

]);

export default router;