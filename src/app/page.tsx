"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FileText, Handshake, ClipboardList, User, PenTool, Check, Info, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignaturePad } from "@/components/signature-pad";
import { ProgressModal } from "@/components/progress-modal";
import {
  waiverContent,
  getAgreementContent,
  translations,
  type Language,
} from "@/lib/content";
import {
  capitalizeFullName,
  generateInitials,
  getCurrentYear,
  getPacificDate,
} from "@/lib/utils";

export default function WaiverForm() {
  // Form state
  const [language, setLanguage] = useState<Language>("en");
  const [fullName, setFullName] = useState("");
  const [initials, setInitials] = useState("");
  const [minorNames, setMinorNames] = useState("");
  const [signatureDate, setSignatureDate] = useState(getPacificDate());
  const [waiverAcknowledged, setWaiverAcknowledged] = useState(false);
  const [agreementAcknowledged, setAgreementAcknowledged] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [clearSignatureTrigger, setClearSignatureTrigger] = useState(0);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const t = translations[language];
  const agreementContent = getAgreementContent(getCurrentYear());

  // Calculate form progress
  const getFormProgress = () => {
    const steps = [
      true, // Step 1: Always considered done (documents are displayed)
      fullName.trim() !== "" &&
        initials.trim() !== "" &&
        waiverAcknowledged &&
        agreementAcknowledged,
      signatureData !== null,
    ];
    return steps;
  };

  const formProgress = getFormProgress();

  const showNotification = (
    type: "success" | "error" | "warning",
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFullNameBlur = () => {
    if (fullName.trim()) {
      const capitalized = capitalizeFullName(fullName.trim());
      setFullName(capitalized);

      const words = capitalized.split(" ").filter((w) => w.trim() !== "");
      if (words.length > 1 && !initials) {
        setInitials(generateInitials(capitalized));
      }
    }
  };

  const handleInitialsChange = (value: string) => {
    setInitials(value.toUpperCase());
  };

  const handleSignatureChange = (data: string | null) => {
    setSignatureData(data);
  };

  const clearForm = useCallback(() => {
    setFullName("");
    setInitials("");
    setMinorNames("");
    setWaiverAcknowledged(false);
    setAgreementAcknowledged(false);
    setSignatureData(null);
    setClearSignatureTrigger((prev) => prev + 1);
  }, []);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      showNotification("warning", t.validationErrors.fullName);
      return false;
    }
    if (!initials.trim()) {
      showNotification("warning", t.validationErrors.initials);
      return false;
    }
    if (!waiverAcknowledged) {
      showNotification("warning", t.validationErrors.waiver);
      return false;
    }
    if (!agreementAcknowledged) {
      showNotification("warning", t.validationErrors.agreement);
      return false;
    }
    if (!signatureData) {
      showNotification("warning", t.validationErrors.signature);
      return false;
    }
    return true;
  };

  const captureScreenshot = async (): Promise<string | null> => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = formRef.current;
      if (!element) return null;

      // Store original scroll position
      const originalScrollY = window.scrollY;
      
      // Scroll to top to capture full page
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Wait for scroll and any animations to complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get the full dimensions of the element
      const rect = element.getBoundingClientRect();
      const fullWidth = element.scrollWidth;
      const fullHeight = element.scrollHeight;

      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scale: 2, // Higher quality
        logging: false,
        width: fullWidth,
        height: fullHeight,
        windowWidth: fullWidth,
        windowHeight: fullHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Ensure all content is visible in the cloned document
          const clonedElement = clonedDoc.body.querySelector('[data-screenshot-target]') || clonedDoc.body.firstElementChild;
          if (clonedElement) {
            // Remove any sticky positioning that might cause issues
            const stickyElements = clonedDoc.querySelectorAll('.sticky');
            stickyElements.forEach((el) => {
              (el as HTMLElement).style.position = 'relative';
              (el as HTMLElement).style.top = 'auto';
            });
            // Ensure overflow is visible
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const style = window.getComputedStyle(el);
              if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
                (el as HTMLElement).style.overflow = 'visible';
                (el as HTMLElement).style.overflowY = 'visible';
              }
            });
          }
        },
      });

      // Restore original scroll position
      window.scrollTo({ top: originalScrollY, behavior: 'instant' });

      return canvas.toDataURL("image/png", 0.95);
    } catch (error) {
      console.error("Screenshot capture failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Capture screenshot BEFORE showing the modal
    const screenshot = await captureScreenshot();

    setIsSubmitting(true);
    setProgressStep(0);

    try {
      // Step 0: Screenshot already captured
      setProgressStep(1);

      // Step 1: Processing
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgressStep(2);

      // Step 2: Submit to API
      const response = await fetch("/api/submit-waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          initials: initials,
          minor_names: minorNames,
          signature_date: signatureDate,
          language: language,
          screenshot_data: screenshot,
        }),
      });

      setProgressStep(3);

      const result = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (result.success) {
        let message = t.success;
        if (result.sharepoint_saved) {
          message += " " + t.successSharePoint;
        } else {
          message += " " + t.errorSharePoint;
        }
        showNotification("success", message);
        clearForm();
        // Scroll to top after successful submission
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showNotification("error", t.errorGeneral);
      }
    } catch (error) {
      console.error("Submission error:", error);
      showNotification("error", t.errorGeneral);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen py-6 sm:py-8 px-3 sm:px-4 safe-area-padding" 
      ref={formRef}
      data-screenshot-target="true"
    >
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Notification Toast - responsive positioning */}
        {notification && (
          <div
            onClick={() => setNotification(null)}
            className={`fixed z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up cursor-pointer
              top-4 right-4 left-4 sm:left-auto sm:max-w-md hover:opacity-90 transition-opacity
              ${
              notification.type === "success"
                ? "bg-green-100 border border-green-300 text-green-800"
                : notification.type === "error"
                ? "bg-red-100 border border-red-300 text-red-800"
                : "bg-yellow-100 border border-yellow-300 text-yellow-800"
            }`}
            role="alert"
            aria-live="polite"
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            ) : notification.type === "error" ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <Info className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="text-sm flex-1">{notification.message}</span>
            <span className="text-xs opacity-60">✕</span>
          </div>
        )}

        {/* Logo - responsive sizing */}
        <div className="text-center animate-fade-in">
          <Image
            src="https://images.squarespace-cdn.com/content/5622cd82e4b0501d40689558/2aedb400-89b8-4f93-856f-cd2c7d5385e4/Hopes_Corner_Logo_Green.png?format=1500w&content-type=image%2Fpng"
            alt="Hope's Corner Logo"
            width={250}
            height={100}
            className="mx-auto w-[180px] sm:w-[250px] h-auto"
            priority
          />
        </div>

        {/* Language Selector - mobile optimized */}
        <Card className="animate-fade-in">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <span className="font-medium text-gray-700 text-sm sm:text-base">
                {t.selectLanguage}:
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => setLanguage("en")}
                  className="flex-1 sm:flex-none sm:min-w-[100px] h-11 sm:h-10"
                >
                  English
                </Button>
                <Button
                  variant={language === "es" ? "default" : "outline"}
                  onClick={() => setLanguage("es")}
                  className="flex-1 sm:flex-none sm:min-w-[100px] h-11 sm:h-10"
                >
                  Español
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section - mobile optimized */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2 sm:pb-6">
            <div className="flex items-center gap-2 text-hopes-green">
              <ClipboardList className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-medium">{t.readDocuments}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Accordion type="single" collapsible defaultValue="waiver">
              <AccordionItem value="waiver">
                <AccordionTrigger className="text-base sm:text-lg font-semibold py-3 sm:py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-hopes-green flex-shrink-0" />
                    <span className="text-left">{t.liabilityWaiver}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto p-3 sm:p-4 bg-gray-50 rounded-lg custom-scrollbar scroll-smooth prose prose-sm max-w-none">
                    <ReactMarkdown>{waiverContent[language]}</ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="agreement">
                <AccordionTrigger className="text-base sm:text-lg font-semibold py-3 sm:py-4">
                  <div className="flex items-center gap-2">
                    <Handshake className="h-4 w-4 sm:h-5 sm:w-5 text-hopes-green flex-shrink-0" />
                    <span className="text-left">{t.participantAgreement}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto p-3 sm:p-4 bg-gray-50 rounded-lg custom-scrollbar scroll-smooth prose prose-sm max-w-none">
                    <ReactMarkdown>{agreementContent[language]}</ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Progress Indicator - mobile optimized */}
        <Card className="animate-fade-in sticky top-2 z-10 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              {[t.step1, t.step2, t.step3].map((step, index) => (
                <React.Fragment key={step}>
                  <div
                    className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto ${
                      formProgress[index]
                        ? "bg-hopes-green text-white shadow-sm"
                        : index === formProgress.findIndex((p) => !p)
                        ? "bg-blue-500 text-white ring-2 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {formProgress[index] && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                    <span className="truncate">{step}</span>
                  </div>
                  {index < 2 && (
                    <span className="text-gray-400 hidden sm:inline">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Section - mobile optimized */}
        <form onSubmit={handleSubmit}>
          <Card className="animate-fade-in">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-hopes-green flex-shrink-0" />
                {t.completeInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm sm:text-base">
                    {t.fullName} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={handleFullNameBlur}
                    placeholder={t.fullNamePlaceholder}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initials" className="text-sm sm:text-base">
                    {t.initials} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="initials"
                    value={initials}
                    onChange={(e) => handleInitialsChange(e.target.value)}
                    placeholder={t.initialsPlaceholder}
                    maxLength={5}
                    className="uppercase"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minorNames" className="text-sm sm:text-base">{t.minorNames}</Label>
                <Input
                  id="minorNames"
                  value={minorNames}
                  onChange={(e) => setMinorNames(e.target.value)}
                  placeholder={t.minorNamesPlaceholder}
                  className="h-11 sm:h-10"
                />
                <p className="text-xs sm:text-sm text-gray-500 flex items-start gap-1">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{t.minorNamesHelp}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">{t.date}</Label>
                <Input
                  id="date"
                  type="date"
                  value={signatureDate}
                  onChange={(e) => setSignatureDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Acknowledgments Section - mobile optimized */}
          <Card className="mt-4 sm:mt-6 animate-fade-in">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-hopes-green flex-shrink-0" />
                {t.requiredAcknowledgments}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 p-3 sm:p-4 border rounded-lg hover:border-hopes-green active:border-hopes-green transition-colors checkbox-item">
                <Checkbox
                  id="waiverAck"
                  checked={waiverAcknowledged}
                  onCheckedChange={(checked) =>
                    setWaiverAcknowledged(checked as boolean)
                  }
                  className="mt-0.5"
                />
                <Label
                  htmlFor="waiverAck"
                  className="cursor-pointer leading-relaxed text-sm sm:text-base"
                >
                  {t.acknowledgeWaiver}{" "}
                  <span className="text-red-500">*</span>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 sm:p-4 border rounded-lg hover:border-hopes-green active:border-hopes-green transition-colors checkbox-item">
                <Checkbox
                  id="agreementAck"
                  checked={agreementAcknowledged}
                  onCheckedChange={(checked) =>
                    setAgreementAcknowledged(checked as boolean)
                  }
                  className="mt-0.5"
                />
                <Label
                  htmlFor="agreementAck"
                  className="cursor-pointer leading-relaxed text-sm sm:text-base"
                >
                  {t.acknowledgeAgreement}{" "}
                  <span className="text-red-500">*</span>
                </Label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-yellow-800 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{t.acknowledgmentNote}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Signature Section - mobile optimized */}
          <Card className="mt-4 sm:mt-6 animate-fade-in">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-hopes-green flex-shrink-0" />
                {t.digitalSignature}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600 mb-2">{t.signatureInstructions}</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 flex items-start gap-1">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{t.signatureTips}</span>
              </p>
              <SignaturePad
                onSignatureChange={handleSignatureChange}
                clearTrigger={clearSignatureTrigger}
              />
            </CardContent>
          </Card>

          {/* Submit Section - mobile optimized */}
          <Card className="mt-4 sm:mt-6 animate-fade-in">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-gray-50 border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="font-medium text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">
                  {t.beforeSubmitting}
                </p>
                <ul className="space-y-2">
                  {Object.values(t.checklist).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-600"
                    >
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-hopes-green flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="xl"
                  className="w-full sm:w-auto sm:min-w-[280px] h-12 sm:h-auto bg-gradient-to-r from-hopes-green to-green-600 hover:from-hopes-green-dark hover:to-green-700 active:scale-[0.98] transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <PenTool className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Submitting...') : t.submitButton}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Progress Modal */}
        <ProgressModal
          isOpen={isSubmitting}
          currentStep={progressStep}
          language={language}
        />

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 no-print">
          <p className="mb-2">
            © {getCurrentYear()} Hope&apos;s Corner, Inc. All rights reserved.
          </p>
          <p className="text-xs">
            {language === 'es' 
              ? 'Si tiene preguntas, contacte a un voluntario o miembro del personal.'
              : 'If you have any questions, please contact a volunteer or staff member.'
            }
          </p>
        </footer>
      </div>
    </div>
  );
}
