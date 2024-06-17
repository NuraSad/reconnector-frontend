import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Groups from "./pages/Groups/Groups";
import Root from './pages/Root/Root';
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import StartPage from "./pages/StartPage/StartPage";
import Leaderboard from "./pages/Leaderboard/Leaderboard"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <StartPage />},
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path:"/leaderboard",
        element: <Leaderboard/>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
