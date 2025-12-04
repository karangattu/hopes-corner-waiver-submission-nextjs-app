"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressModalProps {
  isOpen: boolean;
  currentStep: number;
  language: "en" | "es";
}

const steps = {
  en: [
    { name: "Capture", label: "Capturing form data..." },
    { name: "Process", label: "Processing submission..." },
    { name: "Save", label: "Saving to database..." },
    { name: "Done", label: "Almost done..." },
  ],
  es: [
    { name: "Captura", label: "Capturando datos del formulario..." },
    { name: "Proceso", label: "Procesando envío..." },
    { name: "Guardar", label: "Guardando en base de datos..." },
    { name: "Hecho", label: "Casi terminado..." },
  ],
};

export function ProgressModal({
  isOpen,
  currentStep,
  language,
}: ProgressModalProps) {
  if (!isOpen) return null;

  const currentSteps = steps[language];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-[90%] text-center animate-slide-up">
        <div className="progress-spinner mx-auto mb-6" />
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          {language === "en"
            ? "Processing Your Submission"
            : "Procesando Su Envío"}
        </h4>
        <p className="text-gray-600 mb-6">
          {currentSteps[Math.min(currentStep, 3)]?.label}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          {currentSteps.map((step, index) => (
            <React.Fragment key={step.name}>
              <div
                className={cn(
                  "flex flex-col items-center",
                  index <= currentStep
                    ? "text-hopes-green"
                    : "text-gray-400"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all",
                    index < currentStep
                      ? "bg-hopes-green border-hopes-green text-white"
                      : index === currentStep
                      ? "border-hopes-green text-hopes-green animate-pulse"
                      : "border-gray-300 text-gray-400"
                  )}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-[10px] mt-1">{step.name}</span>
              </div>
              {index < currentSteps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 transition-colors",
                    index < currentStep ? "bg-hopes-green" : "bg-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {language === "en"
            ? "This may take a few seconds..."
            : "Esto puede tomar unos segundos..."}
        </p>
      </div>
    </div>
  );
}
