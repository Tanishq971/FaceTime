
import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./Landing";
import { Room } from "./Room";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
