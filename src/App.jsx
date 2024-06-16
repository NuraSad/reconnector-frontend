import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Groups from "./pages/Groups/Groups";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
