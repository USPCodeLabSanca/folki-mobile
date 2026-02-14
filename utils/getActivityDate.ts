const getActivityDate = (date: string) => {
  const dateObj = new Date(date);
  // Usar a data em UTC para evitar problemas de timezone
  const dateUTC = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
  
  const today = new Date();
  const todayUTC = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const tomorrow = new Date(todayUTC);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextTuesday = new Date(todayUTC);
  nextTuesday.setDate(
    nextTuesday.getDate() + ((2 + 7 - nextTuesday.getDay()) % 7)
  );

  if (dateUTC.getTime() === todayUTC.getTime()) {
    return "Hoje";
  } else if (dateUTC.getTime() === tomorrow.getTime()) {
    return "Amanhã";
  } else {
    const day = dateUTC.getDate();
    const month = dateUTC.toLocaleString("pt-BR", { month: "long" });
    return `${day} de ${month}`;
  }
};

export default getActivityDate;
