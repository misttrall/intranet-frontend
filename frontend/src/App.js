import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminPublicaciones from "./components/AdminPublicaciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPublicaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;