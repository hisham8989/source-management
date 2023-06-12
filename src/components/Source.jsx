import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import sourceDefinitionManager from "../manager/sourceDefinitionManager";
import CreateSourceWorkStation from "./CreateSourceWorkStation";

const Source = () => {
  const params = useParams();
  const [sourceDefinitionId, setSourceDefinitionId] = useState("");

  useEffect(() => {
    if (Object.keys(params).length === 0) return;
    const fetch = async (id) => {
      const result = await sourceDefinitionManager.getSourceDefinitionById(id);
      setSourceDefinitionId(result.sourceDefinitionId);
    };
    fetch(params.sourceDefinitionId);
  }, [params]);
  return (
    <div className="full-width">
      <Navbar />
      <CreateSourceWorkStation sourceDefinitionId={sourceDefinitionId} />
    </div>
  );
};

export default Source;
