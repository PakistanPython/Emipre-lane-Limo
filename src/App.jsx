import React from "react";
import { UserProvider } from "./contexts/UserContext";
import Routes from "./Routes";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
