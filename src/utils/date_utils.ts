/**
 * 
 * @param date 2022-06-01T04:00:00.000Z
 * @returns 01/06/2022
 */
export const parseStringDate = (date: Date | undefined) => {
  if (!date) {
    return 'Indisponível';
  }

  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${day}/${month}/${year}`;
}