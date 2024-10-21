const formatReal = (num: number) => {
  return (
    "R$ " +
    num
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1;")
      .replace(".", ",")
      .replace(";", ".")
  );
};

export default formatReal;
