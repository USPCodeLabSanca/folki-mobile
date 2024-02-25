const getActivityColorByType = (type: string) => {
  switch (type) {
    case "EXAM":
      return "#10673D";
    case "HOMEWORK":
      return "#675410";
    case "ACTIVITY":
      return "#104867";
    case "LIST":
      return "#1C1067";
    default:
      return "#7500BC";
  }
};

export default getActivityColorByType;
