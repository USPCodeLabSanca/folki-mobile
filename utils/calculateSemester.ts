const universityDates = {
  1: [new Date(2026, 1, 23), new Date(2026, 6, 4)],
  2: [new Date(2026, 2, 9), new Date(2026, 6, 18)],
  3: [new Date(2026, 1, 23), new Date(2026, 6, 8)],
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
