const universityDates = {
  USP: [new Date(2026, 7, 3), new Date(2026, 11, 12)], //o primeiro mes, janeiro, comeca em 0, logo é 0 a 12, só o m,es comeca em 0
  UFSCar: [new Date(2026, 7, 17), new Date(2026, 11, 19)],
  UNICAMP: [new Date(2026, 7, 10), new Date(2026, 11, 5)],
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
