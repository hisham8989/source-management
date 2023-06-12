import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import workspaceManager from "../manager/workspaceManager";
import { useState } from "react";
import WorkspaceOption from "./WorkspaceOption";

const CreateWorkspace = () => {
  //   const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);

  const WorkspaceSchema = Yup.object().shape({
    email: Yup.string().email().required("required"),
    name: Yup.string().required("required"),
  });

  const initialValues = {
    email: "",
    name: "",
  };

  const handleSubmit = (values) => {
    workspaceManager
      .createWorkspace(values)
      .then((res) => setWorkspace(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="full-width">
      <Navbar />
      <h1>Create Workspace</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={WorkspaceSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="workspace-form">
            <Field name="email" placeholder="Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="name" placeholder="Name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <button type="submit">create</button>
          </Form>
        )}
      </Formik>
      {workspace && <WorkspaceOption workspace={workspace} />}
    </div>
  );
};

export default CreateWorkspace;
