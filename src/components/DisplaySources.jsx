import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const CustomDataGridContainer = styled(Box)`
  width: 100%;
  height:"80vh"
  margin: auto;

  .MuiDataGrid-root {
    border: none;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  .MuiDataGrid-cell {
    border: 1px solid #242b2e;
    padding: 8px;
  }

  .MuiDataGrid-columnHeader,
  .MuiDataGrid-cell {
    font-weight: bold;
  }

  .MuiDataGrid-row:nth-of-type(odd) {
    background-color: #f0f0f0;
  }

  .MuiDataGrid-row:hover {
    background-color: #ebebeb;
  }
`;

const DisplaySources = ({ sources }) => {
  const columns = [
    {
      field: "id",
      headerName: "S.no",
      width: 100,
      disableColumnMenu: true,
      disableColumnSelector: true,
    },

    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "sourceName",
      headerName: "Source Name",
      width: 180,
    },
    {
      field: "sourceDefinitionId",
      headerName: "Source Definition Id",
      width: 320,
    },
    {
      field: "sourceId",
      headerName: "Source Id",
      width: 320,
    },
    {
      field: "connectionConfiguration",
      headerName: "Config",
      width: 600,
    },
  ];

  const rows = sources.map((source, index) => {
    return {
      id: index + 1,
      name: source.name,
      sourceName: source.sourceName,
      sourceDefinitionId: source.sourceDefinitionId,
      sourceId: source.sourceId,
      connectionConfiguration: Object.keys(
        source.connectionConfiguration
      ).reduce((configString, key) => {
        if (!source.connectionConfiguration[key].toString().startsWith("*")) {
          configString = configString
            ? `${configString} , [ ${key} : ${source.connectionConfiguration[key]} ]`
            : `[ ${key} : ${source.connectionConfiguration[key]} ]`;
        }
        return configString;
      }, ""),
    };
  });

  return (
    <CustomDataGridContainer
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        },
        "& .MuiDataGrid-cell": {
          border: "1px solid #242B2E",
          padding: "8px",
        },
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          fontWeight: "bold",
        },
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          backgroundColor: "#f0f0f0",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#ebebeb",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        autoWidth
        showCellVerticalBorder
      />
    </CustomDataGridContainer>
  );
};

export default DisplaySources;
