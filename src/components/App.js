import { useEffect, useState } from "react";
import Routing from "components/Router";
import { authService } from "myFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  // 인증된 상태(로그인상태) 변화를 감시해서 즉시 setLoggedIn이 작동하도록 함.
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <Routing isLoggedIn={isLoggedIn} /> : "Initializing..."}</>;
}

export default App;
