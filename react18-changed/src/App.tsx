import { Suspense } from "react";
import "./App.css";
import { AutoBatchEventHandler } from "./components/AutoBatchEventHandler";
import { AutoBatchOther } from "./components/AutoBatchOther";
import { ReactQuery } from "./components/ReactQuery";
import { Transition } from "./components/Transition";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  console.log("Appがレンダリング react18だと2回表示される");

  return (
    <div className="App">
      <AutoBatchEventHandler />
      <AutoBatchOther />
      <hr />
      <Transition />
      <hr />
      <ErrorBoundary fallback={<p>エラー</p>}>
        <Suspense fallback={<p>ローディング中</p>}>
          <ReactQuery />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
