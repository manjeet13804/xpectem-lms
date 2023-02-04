const generateAttachedFormData = (formData, array) => {
  array.forEach((file) => {
    formData.append('attachment', file);
  });
};

export default generateAttachedFormData;
