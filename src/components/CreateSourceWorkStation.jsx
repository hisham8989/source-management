import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { REGEX } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const CreateSourceWorkStation = ({ sourceDefinitionId }) => {
  const navigate = useNavigate();

  const CreateSourceSchema = Yup.object().shape({
    workSpaceId: Yup.string()
      .matches(REGEX.uuid, "Invalid workspace ID")
      .required("required"),
    sourceDefinitionId: Yup.string()
      .matches(REGEX.uuid, "Invalid source definition ID")
      .required("required"),
  });

  const initialValues = {
    workSpaceId: "",
    sourceDefinitionId: "",
  };

  const handleSubmit = (values) => {
    navigate(
      `/create-source/wsi/${values.workSpaceId}/sdi/${values.sourceDefinitionId}`
    );
  };

  return (
    <div>
      <h1>Create Source</h1>
      {sourceDefinitionId && (
        <p>
          Source Definition Id :{" "}
          <span style={{ color: "#758283", fontSize: 12 }}>
            {sourceDefinitionId}
          </span>
        </p>
      )}
      {localStorage.getItem("workspace") && (
        <p>
          Saved Workspace Id :{" "}
          <span style={{ color: "#758283", fontSize: 12 }}>
            {JSON.parse(localStorage.getItem("workspace")).workspaceId}
          </span>
        </p>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={CreateSourceSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="source-form">
            <Field name="workSpaceId" placeholder="Workspace id" />
            {errors.workSpaceId && touched.workSpaceId ? (
              <div>{errors.workSpaceId}</div>
            ) : null}
            <Field
              name="sourceDefinitionId"
              placeholder="Source Definition id"
            />
            {errors.sourceDefinitionId && touched.sourceDefinitionId ? (
              <div>{errors.sourceDefinitionId}</div>
            ) : null}
            <button type="submit">save & next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSourceWorkStation;
