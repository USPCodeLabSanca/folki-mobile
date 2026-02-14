/**
 * Converte uma string de data UTC para um objeto Date local ignorando timezone
 * Usa os componentes UTC da data para criar uma data local
 */
const parseUTCDate = (dateString: string): Date => {
  const dateObj = new Date(dateString);
  return new Date(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate(),
    dateObj.getUTCHours(),
    dateObj.getUTCMinutes(),
    dateObj.getUTCSeconds()
  );
};

export default parseUTCDate;
