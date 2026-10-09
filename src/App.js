import Body from "./components/Body";
import Header from "./components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import WatchPage from "./components/WatchPage";
import MainContainer from "./components/MainContainer";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Body />,
        children: [
          {
            path: "watch",
            element: <WatchPage />
          },
          {
            index: true,
            element: <MainContainer />
          }
        ]
      }
    ]
  }
])

function App() {
  return (

    <Provider store={appStore}>
        <div>
          <Header />
          <Outlet />
        </div>
    </Provider>

  );
}

export default App;
