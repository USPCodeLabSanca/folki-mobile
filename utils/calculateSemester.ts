const universityDates = {
  1: [new Date(2025, 7, 4), new Date(2025, 11, 12)],
  2: [new Date(2025, 2, 24), new Date(2025, 6, 26)],
};

const calculateSemester = (universityId: number) => {
  const today = new Date();
  // @ts-ignore
  const start = universityDates[universityId][0];
  // @ts-ignore
  const end = universityDates[universityId][1];
  const total = end.getTime() - start.getTime();
  const current = today.getTime() - start.getTime();
  return Math.min(Math.max(Math.floor((current / total) * 100), 0), 100);
};

export default calculateSemester;
