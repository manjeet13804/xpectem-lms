export default (
  formData,
  translations,
  welcomeEmail,
  welcomeLetter,
  welcomeEmailTemplate,
  welcomeEmailTemplateURL,
  welcomeLetterTemplate,
  welcomeLetterTemplateURL,
  ) => {
  const isWelcomeLetterTemplate = welcomeLetter === 'template';
  if (isWelcomeLetterTemplate) {
    if (welcomeLetterTemplate) {
      formData.append('welcomeLetterTemplate', welcomeLetterTemplate);
    }
    if (welcomeLetterTemplateURL) {
      formData.append('welcomeLetterTemplateURL', welcomeLetterTemplateURL);
    }
  }
  const isWelcomeEmailTemplate = welcomeEmail === 'template';
  if (isWelcomeEmailTemplate) {
    if (welcomeEmailTemplate) {
      formData.append('welcomeEmailTemplate', welcomeEmailTemplate);
    }
    if (welcomeEmailTemplateURL) {
      formData.append('welcomeEmailTemplateURL', welcomeEmailTemplateURL);
    }
  }
  translations.forEach((item, index) => {
    let isExist = false;
    if (item.description) {
      formData.append(`translations[${index}][description]`, item.description);
      isExist = true;
    }
    if (item.descriptionShort) {
      formData.append(`translations[${index}][descriptionShort]`, item.descriptionShort);
      isExist = true;
    }
    if (!isWelcomeLetterTemplate && item.welcomeLetter) {
      formData.append(`translations[${index}][welcomeLetter]`, item.welcomeLetter);
      isExist = true;
    }
    if (!isWelcomeEmailTemplate && item.welcomeEmail) {
      formData.append(`translations[${index}][welcomeEmail]`, item.welcomeEmail);
      isExist = true;
    }

    if (item.systemRequirements) {
      formData.append(`translations[${index}][systemRequirements]`, item.systemRequirements);
      isExist = true;
    }

    if (isExist) {
      formData.append(`translations[${index}][language]`, item.language);
    }
  });
};
