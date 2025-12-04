import { waiverContent, getAgreementContent, translations } from "@/lib/content";

describe("content", () => {
  describe("waiverContent", () => {
    it("should have English waiver content", () => {
      expect(waiverContent.en).toBeDefined();
      expect(waiverContent.en).toContain("SHOWER and LAUNDRY PROGRAM RELEASE FROM LIABILITY");
    });

    it("should have Spanish waiver content", () => {
      expect(waiverContent.es).toBeDefined();
      expect(waiverContent.es).toContain("EXENCIÓN DE RESPONSABILIDAD DEL PROGRAMA DE DUCHAS");
    });

    it("should include electronic signature agreement in English", () => {
      expect(waiverContent.en).toContain("ELECTRONIC SIGNATURE AGREEMENT");
    });

    it("should include electronic signature agreement in Spanish", () => {
      expect(waiverContent.es).toContain("ACUERDO DE FIRMA ELECTRÓNICA");
    });
  });

  describe("getAgreementContent", () => {
    it("should return agreement content with the provided year", () => {
      const content = getAgreementContent(2025);
      expect(content.en).toContain("2025 PARTICIPANT AGREEMENT");
      expect(content.es).toContain("ACUERDO DE PARTICIPANTE 2025");
    });

    it("should update year dynamically", () => {
      const content2024 = getAgreementContent(2024);
      const content2025 = getAgreementContent(2025);
      expect(content2024.en).toContain("2024");
      expect(content2025.en).toContain("2025");
    });

    it("should have English agreement content", () => {
      const content = getAgreementContent(2025);
      expect(content.en).toContain("unhoused");
      expect(content.en).toContain("shower and laundry services");
    });

    it("should have Spanish agreement content", () => {
      const content = getAgreementContent(2025);
      expect(content.es).toContain("sin hogar");
      expect(content.es).toContain("ducha y lavandería");
    });
  });

  describe("translations", () => {
    it("should have English translations", () => {
      expect(translations.en).toBeDefined();
      expect(translations.en.selectLanguage).toBe("Select Language");
    });

    it("should have Spanish translations", () => {
      expect(translations.es).toBeDefined();
      expect(translations.es.selectLanguage).toBe("Seleccionar Idioma");
    });

    it("should have all required fields in English", () => {
      const requiredFields = [
        "selectLanguage",
        "liabilityWaiver",
        "participantAgreement",
        "fullName",
        "initials",
        "submitButton",
        "validationErrors",
      ];

      requiredFields.forEach((field) => {
        expect(translations.en).toHaveProperty(field);
      });
    });

    it("should have all required fields in Spanish", () => {
      const requiredFields = [
        "selectLanguage",
        "liabilityWaiver",
        "participantAgreement",
        "fullName",
        "initials",
        "submitButton",
        "validationErrors",
      ];

      requiredFields.forEach((field) => {
        expect(translations.es).toHaveProperty(field);
      });
    });

    it("should have validation error messages", () => {
      expect(translations.en.validationErrors.fullName).toBeDefined();
      expect(translations.en.validationErrors.initials).toBeDefined();
      expect(translations.en.validationErrors.signature).toBeDefined();
      expect(translations.es.validationErrors.fullName).toBeDefined();
      expect(translations.es.validationErrors.initials).toBeDefined();
      expect(translations.es.validationErrors.signature).toBeDefined();
    });
  });
});
