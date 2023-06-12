import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SourceDefinitions from "./components/SourceDefinitions";
import Source from "./components/Source";
import CreateSource from "./components/CreateSource";
import CreateWorkspace from "./components/CreateWorkspace";
import UpdateWorkspace from "./components/UpdateWorkspace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/source-definitions" element={<SourceDefinitions />} />

        <Route path="/create-source" element={<Source />} />
        <Route
          path="/create-source/sdi/:sourceDefinitionId"
          element={<Source />}
        />
        <Route
          path="/create-source/wsi/:workSpaceId/sdi/:sourceDefinitionId"
          element={<CreateSource />}
        />
        <Route path="/create-workspace" element={<CreateWorkspace />} />
        <Route path="/update-workspace" element={<UpdateWorkspace />} />
        <Route path="/*" element={<h2>404 page</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
