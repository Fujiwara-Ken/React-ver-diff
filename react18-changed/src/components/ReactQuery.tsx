import { Suspense, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TodoList } from "./TodoList";
import { ErrorBoundary } from "react-error-boundary";
import { AlbumList } from "./AlbumList";

type Tabs = "todo" | "album";

export const ReactQuery = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("todo");

  const onClickTabButton = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  return (
    <div style={{ display: "flex", padding: "16px" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <button onClick={() => onClickTabButton("todo")}>Todo</button>
        <button onClick={() => onClickTabButton("album")}>Album</button>
        <ErrorBoundary fallback={<p>Todo or AlbumListエラー</p>}>
          <Suspense fallback={<p>Todo or AlbumListローディング中</p>}>
            {selectedTab === "todo" ? <TodoList /> : <AlbumList />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
