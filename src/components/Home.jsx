import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { REGEX } from "../utils/constants";
import sourceManager from "../manager/sourceManager";
import DisplaySources from "./DisplaySources";

const Home = () => {
  const [noData, setNodata] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [sources, setSources] = useState([]);
  const workspaceIdRef = useRef();

  const handleInputChange = () => {
    const { value } = workspaceIdRef.current;
    const regex = REGEX.uuid;
    const isValid = regex.test(value) && value.trim() !== "";
    setIsValidInput(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sourceManager
      .getSourcesByWorkspaceId(workspaceIdRef.current.value)
      .then((res) => {
        if (res.sources.length === 0) {
          setNodata(true);
        } else {
          setSources(res.sources);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="full-width">
      <Navbar />
      {localStorage.getItem("workspace") && (
        <button
          onClick={() => {
            const { workspaceId: id } = JSON.parse(
              localStorage.getItem("workspace")
            );
            workspaceIdRef.current.value = id;
            workspaceIdRef.current.focus();
          }}
          className="general-button"
        >
          Get Workspace Id from storage
        </button>
      )}
      <form onSubmit={handleSubmit} className="general-form">
        <label htmlFor="workspaceId" style={{ padding: "10px 0px 10px 0px" }}>
          work space id
        </label>
        <input
          name="workspaceId"
          placeholder="valid uuid"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          ref={workspaceIdRef}
          className="general-input"
        />
        {workspaceIdRef.current?.value && !isValidInput && (
          <span className="validation-error">invalid uuid</span>
        )}
        <button
          type="submit"
          disabled={!isValidInput}
          className="general-button general-button__big"
        >
          get all sources
        </button>
      </form>
      {sources.length > 0 && <DisplaySources sources={sources} />}
      {noData && <h1>no sources found with this workspace</h1>}
    </div>
  );
};

export default Home;
