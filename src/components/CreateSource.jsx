import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import sourceDefinitionManager from "../manager/sourceDefinitionManager";
import CreateSourceForm from "./CreateSourceForm";
import sourceManager from "../manager/sourceManager";
import Navbar from "./Navbar";

const CreateSource = () => {
  const navigate = useNavigate();
  const { workSpaceId, sourceDefinitionId } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [requiredFields, setRequiredFields] = useState([]);
  const [fieldsProperties, setFieldsProperties] = useState();

  useEffect(() => {
    const fetchSpecs = async (wsi, sdi) => {
      const specs =
        await sourceDefinitionManager.getSourceDefinitionSpecificationsById(
          wsi,
          sdi
        );
      setFieldsProperties(specs.connectionSpecification.properties);
      const requredValues = specs.connectionSpecification.required;
      setRequiredFields(requredValues);
      const yupSchema = Yup.object().shape({
        ...createValidationSchema(
          requredValues,
          specs.connectionSpecification.properties
        ),
      });
      const currentInnitialValues = {};
      requredValues.forEach((field) => {
        currentInnitialValues[field] = "";
      });

      setInitialValues(currentInnitialValues);
      setValidationSchema(yupSchema);
    };

    fetchSpecs(workSpaceId, sourceDefinitionId);
  }, [workSpaceId, sourceDefinitionId]);

  const createValidationSchema = (fields, fieldsProperties) => {
    const schema = {};
    fields.forEach((field) => {
      schema[field] = Yup.string().required(`${field} is required`);
    });

    return schema;
  };

  if (!validationSchema) {
    <div>loading...</div>;
  }

  const handleSubmit = (values) => {
    for (let key in values) {
      if (key.includes("date")) {
        values[key] += "T00:00:00Z";
      }
    }

    const requestBody = {
      workspaceId: workSpaceId,
      sourceDefinitionId: sourceDefinitionId,
      connectionConfiguration: { ...values },
    };
    sourceManager
      .createSource(requestBody)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert("failed to create source");
        console.log(err);
      });
  };

  return (
    <div className="full-width">
      <Navbar />
      <h1>Create Source</h1>

      {initialValues && validationSchema && requiredFields.length > 0 && (
        <CreateSourceForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          requiredFields={requiredFields}
          handleSubmit={handleSubmit}
          fieldsProperties={fieldsProperties}
        />
      )}
    </div>
  );
};

export default CreateSource;
