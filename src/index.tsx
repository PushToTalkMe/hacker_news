import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Provider } from "react-redux";
import { initStore } from "./store/store";
import bridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  createHashRouter,
  RouterProvider,
} from "@vkontakte/vk-mini-apps-router";

bridge.send("VKWebAppInit");
const store = initStore();

const router = createHashRouter([
  {
    path: "/",
    panel: "home_panel",
    view: "default_view",
  },
  {
    path: "/post/:id",
    panel: "post_panel",
    view: "default_view",
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Provider store={store}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Provider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
