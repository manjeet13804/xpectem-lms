const getErrorMessage = (error) => {
  const { response: { data } = {} } = error;
  if (data) {
    return data.message;
  }
  return error.message;
};

export default getErrorMessage;
