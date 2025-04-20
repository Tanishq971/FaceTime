import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import Room from "./Room";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:name" element = {<Room/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
0;
0;
