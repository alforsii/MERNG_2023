import { Routes, Route } from "react-router-dom";

import Clients from "./components/Clients.jsx";
// import AddClientModal from "./components/AddClientModal";
import "./App.css";
import Projects from "./components/Projects.jsx";
import NotFound from "./components/NotFound.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";

function App() {
  return (
    <div className="container">
      {/* <Clients /> */}
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
