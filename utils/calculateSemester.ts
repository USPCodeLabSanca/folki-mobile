const universityDates = {
  USP: [new Date(2026, 1, 23), new Date(2026, 6, 4)],
  UFSCar: [new Date(2026, 2, 9), new Date(2026, 6, 18)],
  UNICAMP: [new Date(2026, 1, 23), new Date(2026, 6, 8)],
};

const calculateSemester = (universitySlug: string) => {
  const today = new Date();
  // @ts-ignore
  const start = universityDates[universitySlug][0];
  // @ts-ignore
  const end = universityDates[universitySlug][1];
  const total = end.getTime() - start.getTime();
  const current = today.getTime() - start.getTime();
  return Math.min(Math.max(Math.floor((current / total) * 100), 0), 100);
};

export default calculateSemester;
