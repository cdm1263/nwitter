import { useState } from "react";
import Routing from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return <Routing isLoggedIn={isLoggedIn} />;
}

export default App;
