const universityDates = {
  USP: [new Date(2026, 8, 3), new Date(2026, 12, 12)],
  UFSCar: [new Date(2026, 8, 17), new Date(2026, 12, 19)],
  UNICAMP: [new Date(2026, 8, 10), new Date(2026, 12, 5)],
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
