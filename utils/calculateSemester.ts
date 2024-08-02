const calculateSemester = () => {
  const today = new Date();
  const start = new Date(2024, 7, 5);
  const end = new Date(2024, 11, 12);
  const total = end.getTime() - start.getTime();
  const current = today.getTime() - start.getTime();
  return Math.min(Math.max(Math.floor((current / total) * 100), 0), 100);
};

export default calculateSemester;
