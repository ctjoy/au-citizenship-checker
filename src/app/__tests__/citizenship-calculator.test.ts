import { parse } from "date-fns";
import { calculateAbsence, calculateEligibilityDate, parseCsvTrips, Trip } from "../../lib/citizenship-calculator";

describe("Citizenship Calculator", () => {
  describe("calculateAbsence", () => {
    it("should calculate correct absence days for a single trip", () => {
      const trips: Trip[] = [{
        depart: parse("01/01/2023", "dd/MM/yyyy", new Date()),
        arrive: parse("15/01/2023", "dd/MM/yyyy", new Date())
      }];

      const from = parse("01/01/2023", "dd/MM/yyyy", new Date());
      const to = parse("31/01/2023", "dd/MM/yyyy", new Date());

      expect(calculateAbsence(trips, from, to)).toBe(15);
    });

    it("should return 0 for trips outside the date range", () => {
      const trips: Trip[] = [{
        depart: parse("01/01/2023", "dd/MM/yyyy", new Date()),
        arrive: parse("15/01/2023", "dd/MM/yyyy", new Date())
      }];

      const from = parse("16/01/2023", "dd/MM/yyyy", new Date());
      const to = parse("31/01/2023", "dd/MM/yyyy", new Date());

      expect(calculateAbsence(trips, from, to)).toBe(0);
    });
  });

  describe("parseCsvTrips", () => {
    it("should parse valid CSV input", () => {
      const csvInput = "01/01/2023,15/01/2023\n16/02/2023,28/02/2023";
      const result = parseCsvTrips(csvInput);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        depart: parse("01/01/2023", "dd/MM/yyyy", new Date()),
        arrive: parse("15/01/2023", "dd/MM/yyyy", new Date())
      });
    });

    it("should handle empty lines", () => {
      const csvInput = "01/01/2023,15/01/2023\n\n16/02/2023,28/02/2023";
      const result = parseCsvTrips(csvInput);

      expect(result).toHaveLength(2);
    });
  });

  describe("calculateEligibilityDate", () => {
    it("should calculate eligibility date with no absences", () => {
      const residencyStart = parse("01/01/2019", "dd/MM/yyyy", new Date());
      const permanentVisaStart = parse("01/01/2019", "dd/MM/yyyy", new Date());
      const trips: Trip[] = [];

      const result = calculateEligibilityDate(residencyStart, permanentVisaStart, trips);

      expect(result.eligibilityDate).toEqual(parse("01/01/2023", "dd/MM/yyyy", new Date()));
      expect(result.remainingDays4Years).toBe(365);
      expect(result.remainingDays1Year).toBe(90);
    });

    it("should adjust eligibility date when permanent visa starts later", () => {
      const residencyStart = parse("01/01/2019", "dd/MM/yyyy", new Date());
      const permanentVisaStart = parse("01/01/2022", "dd/MM/yyyy", new Date());
      const trips: Trip[] = [];

      const result = calculateEligibilityDate(residencyStart, permanentVisaStart, trips);

      expect(result.eligibilityDate).toEqual(parse("01/01/2023", "dd/MM/yyyy", new Date()));
      expect(result.remainingDays4Years).toBe(365);
      expect(result.remainingDays1Year).toBe(90);
    });
  });
});