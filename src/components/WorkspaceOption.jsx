const WorkspaceOption = ({ workspace }) => {
  const handleClick = () => {
    localStorage.setItem("workspace", JSON.stringify(workspace));
    alert("workspace saved in local storage");
  };

  return (
    <div>
      <p>
        Workspace Id :{" "}
        <span style={{ color: "#758283", fontSize: 12 }}>
          {workspace.workspaceId}
        </span>
      </p>

      <button className="save-workspace-btn" onClick={handleClick}>
        save workspace
      </button>
    </div>
  );
};

export default WorkspaceOption;
