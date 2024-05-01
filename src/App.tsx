import React from "react";
import { Home } from "./pages/Home/Home";
import { Post } from "./pages/Post/Post";
import { Root, View, Panel } from "@vkontakte/vkui";

import "./App.css";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

function App() {
  const { view: activeView, panel: activePanel } = useActiveVkuiLocation();
  return (
    <Root activeView={activeView!}>
      <View nav="default_view" activePanel={activePanel!}>
        <Panel nav="home_panel">
          <Home />
        </Panel>
        <Panel nav="post_panel">
          <Post />
        </Panel>
      </View>
    </Root>
  );
}

export { App };
