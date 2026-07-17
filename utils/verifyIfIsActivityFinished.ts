import parseUTCDate from "./parseUTCDate";

const verifyIfIsActivityFinished = (finishDate: string) => {
  const activityDate = parseUTCDate(finishDate);
  activityDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return activityDate < today;
};

export default verifyIfIsActivityFinished;