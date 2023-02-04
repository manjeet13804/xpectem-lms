export default (validationError) => {
  const FIRST_ERROR = 0;

  return validationError.inner.reduce((errors, error) => ({
    ...errors,
    [error.path]: error.errors[FIRST_ERROR],
  }), {});
};
