export const validateUpdateUser = (user, visibleInputs) => {
  const regexPhone = /^(?:[0-9] ?){6,14}[0-9]$/;
  const regexString = /^(?!\s)[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
  const errors = {
    name: "",
    adress: "",
    phone: "",
    image: "",
  };
  if (visibleInputs.name && (!regexString.test(user.name) || user.name.length > 100 || !user.name.length))
    errors.name = true;
  if (visibleInputs.adress && (!regexString.test(user.adress) || user.adress.length > 100 || !user.adress.length))
    errors.adress = true;
  if (visibleInputs.phone && (!regexPhone.test(user.phone) || !user.phone.length))
    errors.phone = true;
  if (visibleInputs.image) {
    if (!user.image.length) errors.image = true;
    if (user.image.length > 255) errors.image = true;
  }

  return errors;
};

export const anyErrors = (errors) => {
  for (const error in errors) {
    if (errors[error]) return true;
  }
  return false;
};
