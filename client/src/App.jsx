import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";
import PostPage from "./components/pages/PostPage";
import ProtectedRouter from "./components/HOCs/ProtectedRouter";
import useUser from "./components/hooks/useUser";

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: <MainPage user={user} />,
        },
        {
          path: "/my-xs",
          element: (
            <ProtectedRouter
              isAllowed={user.status === "logged"}
              redirect="/auth/signin"
            >
              <PostPage user={user} />
            </ProtectedRouter>
          ),
        },

        {
          element: <ProtectedRouter isAllowed={user.status !== "logged"} />,
          children: [
            {
              path: "/auth/signup",
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: "/auth/signin",
              element: <SignInPage signInHandler={signInHandler} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
