import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import KeyContext from "../components/KeyContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [key, setKey] = useState("");
  return (
    <SessionProvider>
      <KeyContext.Provider
        value={{
          key,
          setKey,
        }}
      >
        <Component {...pageProps} />
      </KeyContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
