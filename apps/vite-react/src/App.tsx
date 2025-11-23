import React from "react";
import "./App.css";

function App() {
  const RemoteBtn = React.lazy(() => import("remote/c-button"));

  return (
    <>
      <React.Suspense fallback={<div>loading...</div>}>
        <RemoteBtn onClick={() => alert("clicked")} />
      </React.Suspense>
    </>
  );
}

export default App;
