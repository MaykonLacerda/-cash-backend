export const getBetweenByOneDay = (date?: Date | string): [Date, Date] => {
  if (!date) return;

  const dateValue = new Date(date);

  // Essa lógica não está funcionando bem,
  // Não tive tempo para fazer a conversão das diferenças entre datas corretamente.
  // Problema:
  //  Input -> 2022-11-09T00:00:00.000Z
  //  Output -> { start: 2022-11-09T03:00:00.000Z, end: 2022-11-10T02:59:59.999Z }
  //  O correto deveria ser -> { start: 2022-11-09T00:00:00.000Z, end: 2022-11-09T23:59:59.999Z }

  const start = new Date(dateValue.setHours(0, 0, 0, 0));
  const end = new Date(dateValue.setHours(23, 59, 59, 999));

  return [start, end];
};
