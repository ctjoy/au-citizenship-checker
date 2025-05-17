import { addYears, eachDayOfInterval, isAfter, isBefore, parse, subYears } from "date-fns";

export interface Trip {
  depart: Date;
  arrive: Date;
}

export function calculateAbsence(trips: Trip[], from: Date, to: Date) {
  let daysAbsent = 0;
  trips.forEach(({ depart, arrive }) => {
    if (isAfter(depart, to) || isBefore(arrive, from)) return;
    const overlapStart = depart < from ? from : depart;
    const overlapEnd = arrive > to ? to : arrive;
    daysAbsent += eachDayOfInterval({ start: overlapStart, end: overlapEnd }).length;
  });
  return daysAbsent;
}

export function calculateEligibilityDate(residencyStart: Date, permanentVisaStart: Date, trips: Trip[]) {
  let checkDate = addYears(residencyStart, 4);

  while (true) {
    const last4Years = subYears(checkDate, 4);
    const last12Months = subYears(checkDate, 1);

    if (isAfter(permanentVisaStart, last12Months)) {
      checkDate = addYears(checkDate, 0); // move forward a day
      checkDate.setDate(checkDate.getDate() + 1);
      continue;
    }

    const absent4Years = calculateAbsence(trips, last4Years, checkDate);
    const absent1Year = calculateAbsence(trips, last12Months, checkDate);

    if (absent4Years > 365 || absent1Year > 90) {
      checkDate = addYears(checkDate, 0); // move forward a day
      checkDate.setDate(checkDate.getDate() + 1);
      continue;
    }

    const remaining4y = 365 - absent4Years;
    const remaining1y = 90 - absent1Year;
    const remaining1yAdjected = remaining1y >= remaining4y ? remaining4y : remaining1y;

    return {
      eligibilityDate: checkDate,
      remainingDays4Years: remaining4y,
      remainingDays1Year: remaining1yAdjected
    };
  }
}

export function parseCsvTrips(csvTrips: string): Trip[] {
  return csvTrips
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [depart, arrive] = line.split(",").map(d => d.trim());
      return {
        depart: parse(depart, "dd/MM/yyyy", new Date()),
        arrive: parse(arrive, "dd/MM/yyyy", new Date())
      };
    });
}