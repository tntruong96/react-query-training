import React, { Suspense } from "react";

import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Users from "./components/Users";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
