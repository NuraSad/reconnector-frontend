import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
