import {
  capitalizeFullName,
  generateInitials,
  cn,
} from "@/lib/utils";

describe("utils", () => {
  describe("capitalizeFullName", () => {
    it("should capitalize each word in a name", () => {
      expect(capitalizeFullName("john doe")).toBe("John Doe");
    });

    it("should handle already capitalized names", () => {
      expect(capitalizeFullName("John Doe")).toBe("John Doe");
    });

    it("should handle all uppercase names", () => {
      expect(capitalizeFullName("JOHN DOE")).toBe("John Doe");
    });

    it("should handle mixed case names", () => {
      expect(capitalizeFullName("jOHN dOE")).toBe("John Doe");
    });

    it("should handle single word names", () => {
      expect(capitalizeFullName("john")).toBe("John");
    });

    it("should handle names with multiple spaces", () => {
      expect(capitalizeFullName("john  doe")).toBe("John  Doe");
    });

    it("should handle empty string", () => {
      expect(capitalizeFullName("")).toBe("");
    });

    it("should handle names with three words", () => {
      expect(capitalizeFullName("mary jane watson")).toBe("Mary Jane Watson");
    });
  });

  describe("generateInitials", () => {
    it("should generate initials from a full name", () => {
      expect(generateInitials("John Doe")).toBe("JD");
    });

    it("should handle single word names", () => {
      expect(generateInitials("John")).toBe("J");
    });

    it("should handle names with three words", () => {
      expect(generateInitials("Mary Jane Watson")).toBe("MJW");
    });

    it("should filter out empty strings from split", () => {
      expect(generateInitials("John  Doe")).toBe("JD");
    });

    it("should return empty string for empty input", () => {
      expect(generateInitials("")).toBe("");
    });

    it("should return uppercase initials", () => {
      expect(generateInitials("john doe")).toBe("JD");
    });

    it("should handle names with extra whitespace", () => {
      expect(generateInitials("  John   Doe  ")).toBe("JD");
    });
  });

  describe("cn", () => {
    it("should merge class names", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      expect(cn("base", true && "active")).toBe("base active");
      expect(cn("base", false && "active")).toBe("base");
    });

    it("should handle undefined values", () => {
      expect(cn("base", undefined)).toBe("base");
    });

    it("should merge conflicting Tailwind classes", () => {
      expect(cn("px-2", "px-4")).toBe("px-4");
    });

    it("should handle arrays of classes", () => {
      expect(cn(["class1", "class2"])).toBe("class1 class2");
    });
  });
});
