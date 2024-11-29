import { createBrowserRouter } from "react-router-dom";
import Pokemon from "../pages/pokemon";
import Starwars from "../pages/starwars";
import Nav from "../layout/home";
import Linktree from '../pages/linktree'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "/pokemon",
        element: <Pokemon />,
      },
      {
        path: "/starwars",
        element: <Starwars />,
      },
      {
        path: "/linktree",
        element: <Linktree />,
      },
    ],
  },
]);

export default router;
