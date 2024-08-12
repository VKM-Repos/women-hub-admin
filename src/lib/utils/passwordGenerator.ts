export const generatePassword = (length: number = 12): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let newPassword = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    newPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  return newPassword;
};
