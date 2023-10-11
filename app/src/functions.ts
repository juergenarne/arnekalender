export const shiftDate = (date: Date, days:number = 0, months:number = 0, years:number = 0) => 
{
  const day = date.getDate() + days
  const mon = date.getMonth() + months
  const year = date.getFullYear() + years
  return new Date(year, mon, day, 0, 0, 0, 0)
}
