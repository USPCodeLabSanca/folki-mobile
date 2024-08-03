const getImportantColorByType = (type: string) => {
  switch (type) {
    case "DAY_OFF":
      return "#bc0036";
    default:
      return "#076f2c";
  }
};

export default getImportantColorByType;
