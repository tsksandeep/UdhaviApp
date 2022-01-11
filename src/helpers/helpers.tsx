export const phoneNumberValidator = (phoneNumber: string) => {
  if (!phoneNumber) return "Phone number can't be empty.";
  if (!phoneNumber.startsWith("+91"))
    return "Phone number should start with +91";

  phoneNumber = phoneNumber.replace(/\s/g, "").replace("+91", "");
  const re = RegExp("^[6-9]\\d{9}$");
  if (!re.test(phoneNumber)) {
    return "Ooops! We need a valid phone number";
  }

  return "";
};

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
};

export const nameValidator = (name: string) => {
  if (!name) return "Name can't be empty.";
  return "";
};

export const passwordValidator = (password: string) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return "Password must be at least 5 characters long.";
  return "";
};
