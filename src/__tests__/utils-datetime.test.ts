import {
  getPacificTime,
  getPacificDate,
  getPacificDateTime,
  getCurrentYear,
} from "@/lib/utils";

describe("datetime utils", () => {
  describe("getPacificTime", () => {
    it("should return a Date object", () => {
      const result = getPacificTime();
      expect(result).toBeInstanceOf(Date);
    });

    it("should return a valid date", () => {
      const result = getPacificTime();
      expect(isNaN(result.getTime())).toBe(false);
    });
  });

  describe("getPacificDate", () => {
    it("should return a string in yyyy-MM-dd format", () => {
      const result = getPacificDate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should return a valid date string", () => {
      const result = getPacificDate();
      const date = new Date(result);
      expect(isNaN(date.getTime())).toBe(false);
    });
  });

  describe("getPacificDateTime", () => {
    it("should return a string in yyyy-MM-dd HH:mm:ss format", () => {
      const result = getPacificDateTime();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it("should contain a valid date portion", () => {
      const result = getPacificDateTime();
      const datePart = result.split(" ")[0];
      const date = new Date(datePart);
      expect(isNaN(date.getTime())).toBe(false);
    });

    it("should contain a valid time portion", () => {
      const result = getPacificDateTime();
      const timePart = result.split(" ")[1];
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
      
      expect(hours).toBeGreaterThanOrEqual(0);
      expect(hours).toBeLessThanOrEqual(23);
      expect(minutes).toBeGreaterThanOrEqual(0);
      expect(minutes).toBeLessThanOrEqual(59);
      expect(seconds).toBeGreaterThanOrEqual(0);
      expect(seconds).toBeLessThanOrEqual(59);
    });
  });

  describe("getCurrentYear", () => {
    it("should return a number", () => {
      const result = getCurrentYear();
      expect(typeof result).toBe("number");
    });

    it("should return a valid year", () => {
      const result = getCurrentYear();
      expect(result).toBeGreaterThanOrEqual(2020);
      expect(result).toBeLessThanOrEqual(2100);
    });

    it("should return the current year", () => {
      const result = getCurrentYear();
      const currentYear = new Date().getFullYear();
      // Allow for timezone differences (could be off by 1 at year boundary)
      expect(Math.abs(result - currentYear)).toBeLessThanOrEqual(1);
    });
  });
});
