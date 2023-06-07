import { useEffect } from "react";
import Router from "./Router";
import TagManager from "react-gtm-module";

function App() {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-6ZQR8Z4P23" });
  }, []);
  return <Router />;
}

export default App;
