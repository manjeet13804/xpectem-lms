import getErrorsFromValidationError from './getErrorsFromValidationError'

export default ({
  schema,
  values,
  cbSuccess = () => null,
  cbFail = () => null,
}) => {
  try {
    schema.validateSync(values, { abortEarly: false });
    cbSuccess();
    return true;
  } catch (error) {
    const errors = getErrorsFromValidationError(error);
    cbFail(errors);
    return false;
  }
}