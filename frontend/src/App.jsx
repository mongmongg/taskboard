import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ModalContextProvider from "./store/ModalContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import AuthContextProvider from "./store/AuthContext";

const Authentication = lazy(
  () => import("./pages/Authentication/Authentication"),
);
// import ProtectedRoot from "./pages/Root/ProctectedRoot";
const Workspace = lazy(() => import("./pages/(protected)/Workspace"));
const ProtectedRoot = lazy(() => import("./pages/Root/ProctectedRoot"));
const Board = lazy(() => import("./pages/(protected)/Board"));
const UserSettings = lazy(() => import("./pages/(protected)/UserSettings"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const TaskModal = lazy(() => import("./pages/(protected)/TaskModal"));
import TaskDetailsModal from "./pages/(protected)/TaskDetailsModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoot />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        path: "main",
        element: <Workspace />,
      },
      {
        path: "boards/:bId",
        element: <Board />,
        children: [
          {
            path: "task/:tId",
            element: <TaskModal />,
          },
          {
            path: "task/:tId/details",
            element: <TaskDetailsModal />,
          },
        ],
      },
      {
        path: "/settings",
        element: <UserSettings />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: (
      <Suspense>
        <Authentication />
      </Suspense>
    ),
  },
]);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ModalContextProvider>
          <Suspense>
            <RouterProvider router={router}></RouterProvider>
          </Suspense>
        </ModalContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
