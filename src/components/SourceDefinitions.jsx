import Navbar from "./Navbar";
import SourceDefinitionTable from "./SourceDefinitionTable";

const SourceDefinitions = () => {
  return (
    <div className="full-width">
      <Navbar />
      <div className="source-defintion-table-container">
        <h2 className="source-defintion-table-container__headline">
          Source Defintions
        </h2>
        <SourceDefinitionTable />
      </div>
    </div>
  );
};

export default SourceDefinitions;
