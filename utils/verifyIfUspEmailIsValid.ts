const verifyIfUspEmailIsValid = (email: string) => {
  return email.endsWith("@usp.br");
};

export default verifyIfUspEmailIsValid;
