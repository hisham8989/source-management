import { Field, Formik, Form } from "formik";

const CreateSourceForm = ({
  requiredFields,
  initialValues,
  validationSchema,
  handleSubmit,
  fieldsProperties,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, dirty, isSubmitting }) => (
        <Form className="source-form">
          {requiredFields.map((field, index) => (
            <div key={`field-${index}`}>
              <Field
                name={field}
                placeholder={fieldsProperties[field]?.title ?? field}
                type={field.includes("date") ? "date" : "text"}
              />

              {errors[field] && touched[field] ? (
                <div>{errors[field]}</div>
              ) : null}
            </div>
          ))}

          <button disabled={isSubmitting || !dirty} type="submit">
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSourceForm;
