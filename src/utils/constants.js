export const API_CONSTANTS = {
  getWorkspaceById: "/api/v1/workspaces/get",
  getSourceDefinitionList: "/api/v1/source_definitions/list",
  getSourceDefinitionById: "/api/v1/source_definitions/get",
  getSourceDefinitionSpecs: "/api/v1/source_definition_specifications/get",
  createSource: "/api/v1/sources/create",
  createWorkspace: "/api/v1/workspaces/create",
  getSouceListOfWorkspace: "/api/v1/sources/list",
};

export const REGEX = {
  uuid: /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/,
};
