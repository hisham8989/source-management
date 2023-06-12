import { postApi } from "../utils/apiCalls";
import { API_CONSTANTS } from "../utils/constants";

const getSourceDefinitionList = async () => {
  const data = await postApi(API_CONSTANTS.getSourceDefinitionList);
  return data;
};

const getSourceDefinitionById = async (sdi = "") => {
  const requestBody = {
    sourceDefinitionId: sdi,
  };
  const data = await postApi(
    API_CONSTANTS.getSourceDefinitionById,
    requestBody
  );
  return data;
};

const getSourceDefinitionSpecificationsById = async (wsi = "", sdi = "") => {
  const requestBody = {
    sourceDefinitionId: sdi,
    workspaceId: wsi,
  };
  const data = await postApi(
    API_CONSTANTS.getSourceDefinitionSpecs,
    requestBody
  );
  return data;
};

export default {
  getSourceDefinitionList,
  getSourceDefinitionById,
  getSourceDefinitionSpecificationsById,
};
