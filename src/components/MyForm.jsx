import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const MyForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("required"),
  });

  const initialValues = { email: "", password: "" };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, isSubmitting, dirty }) => (
        <Form>
          <Field type="email" name="email" />
          {errors.email && touched.email && errors.email}
          <Field type="password" name="password" />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting || !dirty}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
