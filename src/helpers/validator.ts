export const phoneNumberValidator = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/\s/g, '').replace('+91', '');
  const re = RegExp('^[6-9]\\d{9}$');
  if (!re.test(phoneNumber)) {
    return false;
  }

  return true;
};

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return true;
};

export const passwordValidator = (password: string) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return 'Password must be at least 5 characters long.';
  return true;
};
