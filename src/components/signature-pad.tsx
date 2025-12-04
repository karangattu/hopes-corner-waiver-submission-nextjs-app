"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange: (data: string | null) => void;
  clearTrigger?: number;
  className?: string;
}

export function SignaturePad({
  onSignatureChange,
  clearTrigger,
  className,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const isInitializedRef = useRef(false);
  const lastClearTriggerRef = useRef(clearTrigger);

  const getCoordinates = useCallback(
    (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return null;
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      } else {
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      }
    },
    []
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  }, [onSignatureChange]);

  // Initialize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up canvas
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
    
    isInitializedRef.current = true;
  }, []);

  // Handle clear trigger - only clear when the value actually changes
  useEffect(() => {
    if (!isInitializedRef.current) return;
    
    if (clearTrigger !== undefined && clearTrigger !== lastClearTriggerRef.current) {
      lastClearTriggerRef.current = clearTrigger;
      clearCanvas();
    }
  }, [clearTrigger, clearCanvas]);

  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const coords = getCoordinates(e);
      if (!coords) return;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    },
    [getCoordinates]
  );

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const coords = getCoordinates(e);
      if (!coords) return;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    },
    [isDrawing, getCoordinates]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setHasSignature(true);

    const canvas = canvasRef.current;
    if (canvas) {
      const signatureData = canvas.toDataURL("image/png");
      onSignatureChange(signatureData);
    }
  }, [isDrawing, onSignatureChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Touch events
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });
    canvas.addEventListener("touchcancel", stopDrawing, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="signature-canvas w-full h-auto border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair bg-gray-50 hover:border-primary active:border-primary transition-colors mx-auto block"
        style={{ aspectRatio: "3/1", maxWidth: "100%", touchAction: "none" }}
      />
      <div className="flex justify-center mt-3 sm:mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={clearCanvas}
          disabled={!hasSignature}
          className="gap-2 h-11 sm:h-10 w-full sm:w-auto"
        >
          <Trash2 className="h-4 w-4" />
          Clear Signature
        </Button>
      </div>
    </div>
  );
}
