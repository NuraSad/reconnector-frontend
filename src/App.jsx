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
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Root from "./pages/Root/Root";
import SingleLeaderBoard from "./pages/SingleLeaderBoard/SingleLeaderBoard";

import SingleGroup from "./pages/SingleGroup/SingleGroup";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <ProfilePage /> },
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
			// {
			//   path: "/profile",
			//   element: <ProfilePage />,
			// },
			{
				path: "/calendar",
				element: <Calendar />,
			},
			{
				path: "/maps",
				element: <Map />,
			},
		],
	},
]);

function App() {
	const [session, setSession] = useState(null);

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
					<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["discord", "github", "google"]} />
				</div>
			</div>
		);
	} else {
		return <RouterProvider router={router} id="root" />;
	}
}

export default App;
