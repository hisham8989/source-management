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
      try {
        const specs =
          await sourceDefinitionManager.getSourceDefinitionSpecificationsById(
            wsi,
            sdi
          );

        const currentFieldsProperties =
          specs.connectionSpecification.properties;

        setFieldsProperties(currentFieldsProperties);
        const requredValues = specs.connectionSpecification.required;
        setRequiredFields(requredValues);
        const yupSchema = Yup.object().shape({
          ...createValidationSchema(requredValues, currentFieldsProperties),
        });
        const currentInnitialValues = {};
        requredValues.forEach((field) => {
          if (currentFieldsProperties[field].type === "array") {
            currentInnitialValues[field] = [""];
          } else if (currentFieldsProperties[field].type === "string") {
            currentInnitialValues[field] = "";
          }
        });

        setInitialValues(currentInnitialValues);
        setValidationSchema(yupSchema);
      } catch (err) {
        alert("failed to fetch source defintion");
        navigate("/source-definitions");
      }
    };

    fetchSpecs(workSpaceId, sourceDefinitionId);
  }, [workSpaceId, sourceDefinitionId, navigate]);

  const createValidationSchema = (fields, fieldsProperties) => {
    const schema = {};
    fields.forEach((field) => {
      if (fieldsProperties[field].pattern) {
        schema[field] = Yup.string()
          .matches(fieldsProperties[field].pattern, "should match the pattern")
          .required(`${fieldsProperties[field]?.title ?? field} is required`);
      } else if (
        fieldsProperties[field].type === "string" &&
        fieldsProperties[field]?.enum
      ) {
        const enumValues = [...fieldsProperties[field].enum];
        schema[field] = Yup.string()
          .oneOf(
            enumValues,
            `Invalid value. Valid values are: ${enumValues.join(", ")}`
          )
          .required(`${fieldsProperties[field]?.title ?? field} is required`);
      } else if (fieldsProperties[field].type === "string") {
        schema[field] = Yup.string().required(
          `${fieldsProperties[field]?.title ?? field} is required`
        );
      } else if (fieldsProperties[field]?.type === "array") {
        schema[field] = Yup.array()
          .min(
            1,
            `at least one ${
              fieldsProperties[field]?.title ?? field
            } is required`
          )
          .of(
            Yup.string().required(
              `${fieldsProperties[field]?.title ?? field} is required`
            )
          );
      }
    });

    return schema;
  };

  if (!validationSchema) {
    <div>loading...</div>;
  }

  const handleSubmit = (values) => {
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
