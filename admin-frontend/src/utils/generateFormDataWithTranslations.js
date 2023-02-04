export default (formData, translations) => {
  translations.forEach((item, index) => {
    let isExist = false;
    if (item.description) {
      formData.append(`translations[${index}][description]`, item.description);
      isExist = true;
    }
    if (item.adminWelcomeText) {
      formData.append(`translations[${index}][adminWelcomeText]`, item.adminWelcomeText);
      isExist = true;
    }
    if (item.studentWelcomeText) {
      formData.append(`translations[${index}][studentWelcomeText]`, item.studentWelcomeText);
      isExist = true;
    }

    if (isExist) {
      formData.append(`translations[${index}][language]`, item.language);
    }
  });
};
