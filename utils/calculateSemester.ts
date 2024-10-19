const universityDates = {
  1: [new Date(2024, 7, 5), new Date(2024, 11, 12)],
  2: [new Date(2024, 9, 14), new Date(2025, 2, 7)],
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
