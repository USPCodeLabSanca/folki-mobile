const verifyIfIsActivityFinished = (finishDate: string) => {
  const date = new Date(finishDate);
  const today = new Date();
  return date < today;
};

export default verifyIfIsActivityFinished;
