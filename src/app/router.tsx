import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";

import { BottomNav } from "../components/navigation/BottomNav";
import { HomePage } from "./routes/HomePage";
import { MapPage } from "./routes/MapPage";
import { SavedPage } from "./routes/SavedPage";
import { SpotDetailPage } from "./routes/SpotDetailPage";
import { SpotsPage } from "./routes/SpotsPage";
import { WorkDetailPage } from "./routes/WorkDetailPage";

function AppShell() {
  const location = useLocation();
  const shellClassName = `app-shell ${location.pathname.startsWith("/map") ? "app-shell-wide" : ""}`.trim();

  return (
    <div className={shellClassName}>
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "spots", element: <SpotsPage /> },
      { path: "spots/:slug", element: <SpotDetailPage /> },
      { path: "works/:slug", element: <WorkDetailPage /> },
      { path: "map", element: <MapPage /> },
      { path: "saved", element: <SavedPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
