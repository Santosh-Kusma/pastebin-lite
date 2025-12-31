import { useState } from "react";
import { Paste } from "./pages/Paste";

function App() {
  const [count, setCount] = useState(0);

  return <Paste />;
}

export default App;
