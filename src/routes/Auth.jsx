import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "myFirebase";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  function onChange(event) {
    const {
      // 구조분해할당. const {name, value} = event.target 과 같음
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  async function onSubmit(event) {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
