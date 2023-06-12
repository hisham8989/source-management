import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import sourceDefinitionManager from "../manager/sourceDefinitionManager";
import { useNavigate } from "react-router-dom";

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

const SourceDefinitionTable = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    {
      icon: "-",
      name: "-",
      sourceType: "-",
      sourceDefinitionId: "-",
    },
  ]);

  const columns = [
    {
      field: "icon",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        const iconSvg = params?.row?.icon;
        return iconSvg ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                height: "25px",
                transform: "scale(0.1)",
              }}
              dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
          </div>
        ) : (
          "-"
        );
      },
      disableColumnMenu: true,
      disableColumnSelector: true,
      disableSort: true,
    },
    {
      field: "id",
      headerName: "S.no",
      width: 150,
      disableColumnMenu: true,
      disableColumnSelector: true,
    },

    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "sourceType",
      headerName: "Source Type",
      width: 300,
    },
    {
      field: "sourceDefinitionId",
      headerName: "Source Definition Id",
      width: 600,
    },
  ];

  const rows = tableData.map((sourceDefinition, index) => {
    return {
      icon: sourceDefinition.icon,
      id: index + 1,
      name: sourceDefinition.name,
      sourceType: sourceDefinition.sourceType,
      sourceDefinitionId: sourceDefinition.sourceDefinitionId,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const { sourceDefinitions } =
        await sourceDefinitionManager.getSourceDefinitionList();
      setTableData(sourceDefinitions);
    };

    fetchData();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/create-source/sdi/${params.row.sourceDefinitionId}`);
  };

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
        onRowClick={handleRowClick}
      />
    </CustomDataGridContainer>
  );
};

export default SourceDefinitionTable;
