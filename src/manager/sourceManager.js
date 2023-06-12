import { postApi } from "../utils/apiCalls";
import { API_CONSTANTS } from "../utils/constants";

const createSource = async (body) => {
  const data = await postApi(API_CONSTANTS.createSource, body);
  return data;
};

const getSourcesByWorkspaceId = async (id) => {
  const body = {
    workspaceId: id,
  };
  const data = await postApi(API_CONSTANTS.getSouceListOfWorkspace, body);
  return data;
};

export default {
  createSource,
  getSourcesByWorkspaceId,
};
