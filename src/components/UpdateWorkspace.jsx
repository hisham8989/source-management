import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { REGEX } from "../utils/constants";
import workspaceManager from "../manager/workspaceManager";

const UpdateWorkspace = () => {
  const [isValidInput, setIsValidInput] = useState(false);
  const workspaceIdRef = useRef();

  const handleClick = () => {
    workspaceManager
      .getWorkspaceInfo(workspaceIdRef.current.value)
      .then((res) => {
        localStorage.setItem("workspace", JSON.stringify(res.workspace));
        alert("workspace saved in local storage");
      })
      .catch((err) => {
        alert("no wrokspace found in db");
        console.log(err);
      });
  };

  const handleInputChange = () => {
    const { value } = workspaceIdRef.current;
    const regex = REGEX.uuid;
    const isValid = regex.test(value) && value.trim() !== "";
    setIsValidInput(isValid);
  };
  return (
    <div className="full-width">
      <Navbar />
      <div className="workspace-form marginTop">
        <input
          onChange={handleInputChange}
          ref={workspaceIdRef}
          placeholder="valid workspace id"
        />
        {workspaceIdRef.current?.value && !isValidInput && (
          <span className="validation-error">invalid uuid</span>
        )}
        <button className="save-workspace-btn" onClick={handleClick}>
          save workspace
        </button>
      </div>
    </div>
  );
};

export default UpdateWorkspace;
