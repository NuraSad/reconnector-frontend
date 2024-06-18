import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Groups from "./pages/Groups/Groups";
import Root from './pages/Root/Root';
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import StartPage from "./pages/StartPage/StartPage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Calendar from "./pages/Calendar/Calendar";


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
        path:"/leaderboards",
        element: <Leaderboard/>,
      }, {
        path:"/profile",
        element: <ProfilePage/>,
      },
      {
        path:"/calendar",
        element: <Calendar/>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} id='root'/>;
}

export default App;
