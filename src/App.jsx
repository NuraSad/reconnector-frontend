// App.jsx
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
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Map from "./pages/Map/Map";
import NewEvent from "./pages/NewEvent/NewEvent";
import NewGroup from "./pages/NewGroup/NewGroup";
import NewPost from "./pages/NewPost/NewPost";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Root from "./pages/Root/Root";
import SingleGroup from "./pages/SingleGroup/SingleGroup";
import SingleLeaderBoard from "./pages/SingleLeaderBoard/SingleLeaderBoard";
import { getUserId } from "./userUtils.js";

function App() {

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
          path: "/createPost",
          element: <NewPost />,
        },
        {
          path: "/createEvent",
          element: <NewEvent />,
        },
      ],
    },
  ]);

  const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);

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
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchUser();

  }, [session]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        const userId = await getUserId();
        setInternalUserId(userId);
      }
    };

    fetchUserId();
  }, [user]);
 
    return (
      session ? (<RouterProvider router={router} id="root" />) : (
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
      )
    );
}

export default App;
