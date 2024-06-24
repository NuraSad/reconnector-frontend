import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import supabase from "./config/supabaseClient";
import Calendar from "./pages/Calendar/Calendar";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Explore from "./pages/Explore/Explore";
import Groups from "./pages/Groups/Groups";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";
// import StartPage from "./pages/StartPage/StartPage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Map from "./pages/Map/Map";
import NewGroup from "./pages/NewGroup/NewGroup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Root from "./pages/Root/Root";
import SingleGroup from "./pages/SingleGroup/SingleGroup";
import SingleLeaderBoard from "./pages/SingleLeaderBoard/SingleLeaderBoard";
import { getUserId } from "./userUtils.js";
import NewEvent from "./pages/NewEvent/NewEvent.jsx";

function App() {
  const [session, setSession] = useState(null);
  const [internalUserId, setInternalUserId] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ProfilePage userId={internalUserId} /> },
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
          element: <ProfilePage userId={internalUserId} />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/maps",
          element: <Map />,
        },
        {
          path: "/createGroup",
          element: <NewGroup />,
        },
        {
          path: "/createEvent",
          element: <NewEvent />,
        },
      ],
    },
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setInternalUserId(userId);
    };

    fetchUserId();
  }, [session]);

  if (!session) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["discord", "github", "google"]}
          />
        </div>
      </div>
    );
  } else {
    return <RouterProvider router={router} id="root" />;
  }
}

export default App;
