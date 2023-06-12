import { postApi } from "../utils/apiCalls";
import { API_CONSTANTS } from "../utils/constants";

const getWorkspaceInfo = async (workspaceId) => {
  const body = {
    workspaceId: workspaceId,
  };

  const data = await postApi(API_CONSTANTS.getWorkspaceById, body);
  return data;
};

const createWorkspace = async (inputs) => {
  const body = {
    email: inputs.email,
    name: inputs.name,
  };
  const data = await postApi(API_CONSTANTS.createWorkspace, body);
  return data;
};

export default {
  createWorkspace,
  getWorkspaceInfo,
};
