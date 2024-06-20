import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Groups from "./pages/Groups/Groups";
import Root from "./pages/Root/Root";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import StartPage from "./pages/StartPage/StartPage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import SingleLeaderBoard from "./pages/SingleLeaderBoard/SingleLeaderBoard";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Calendar from "./pages/Calendar/Calendar";
import Map from "./pages/Map/Map";

import SingleGroup from "./pages/SingleGroup/SingleGroup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <StartPage /> },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/groups/:id",
        element: <SingleGroup />,
      },
      {
        path: "/leaderboards",
        element: <Leaderboard />,
      },
      {
        path: "/leaderboards/:id",
        element: <SingleLeaderBoard />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path:"/maps",
        element: <Map/>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} id="root" />;
}

export default App;
