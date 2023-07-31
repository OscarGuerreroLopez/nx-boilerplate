export const validatePassword = (password: string): boolean => {
  return /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(password);
};
