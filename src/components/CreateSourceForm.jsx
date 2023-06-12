import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";

const CreateSourceForm = ({
  requiredFields,
  initialValues,
  validationSchema,
  handleSubmit,
  fieldsProperties,
}) => {
  const handleDeleteField = (index, form, field) => {
    const updatedArray = form.values[field].filter(
      (currField) => currField !== form.values[field][index]
    );
    form.setFieldValue(field, updatedArray);
    form.setFieldTouched(field, true);
  };

  const handleAddField = (form, field) => {
    form.setFieldValue(field, [...form.values[field], ""]);
    form.setFieldTouched(field, true);
  };

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
              {fieldsProperties[field].type === "array" ? (
                <FieldArray name={field}>
                  {({ form, push, remove }) => {
                    const arrayFieldValue = form.values[field] || [];
                    return (
                      <>
                        {arrayFieldValue.map((value, arrayIndex) => (
                          <div key={`array-field-${arrayIndex}`}>
                            <Field
                              name={`${field}[${arrayIndex}]`}
                              value={value}
                              placeholder={
                                fieldsProperties[field]?.title ?? field
                              }
                              type={"text"}
                            />
                            {arrayIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(arrayIndex)}
                                style={{ backgroundColor: "#FF6666" }}
                              >
                                {`Remove ${fieldsProperties[field]?.title} Input`}
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")}>
                          {`Add ${fieldsProperties[field]?.title} Input`}
                        </button>
                      </>
                    );
                  }}
                </FieldArray>
              ) : (
                <>
                  <Field
                    name={field}
                    placeholder={fieldsProperties[field]?.title ?? field}
                    type={"text"}
                  />
                  {errors[field] && touched[field] ? (
                    <div>{errors[field]}</div>
                  ) : null}
                </>
              )}
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
