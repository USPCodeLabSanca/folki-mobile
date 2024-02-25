const getWeekDay = () => {
  const date = new Date();
  const days = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];
  return {
    full: days[date.getDay()],
    short: days[date.getDay()].slice(0, 3),
  };
};

export default getWeekDay;
