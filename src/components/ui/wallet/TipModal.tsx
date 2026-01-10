"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { TipUsdc } from "./TipUsdc";

type TipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipientFid?: number;
  username?: string;
  recipientAddress?: `0x${string}`;
};

const PREDEFINED_AMOUNTS = [1, 5, 10, 25];

export function TipModal({
  isOpen,
  onClose,
  recipientFid,
  username,
  recipientAddress,
}: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [useCustomAmount, setUseCustomAmount] = useState<boolean>(false);
  const [finalAmount, setFinalAmount] = useState<number>(5);

  // Update final amount when selection changes
  useEffect(() => {
    if (useCustomAmount && customAmount) {
      const parsed = parseFloat(customAmount);
      if (!isNaN(parsed) && parsed > 0) {
        setFinalAmount(parsed);
      }
    } else {
      setFinalAmount(selectedAmount);
    }
  }, [selectedAmount, customAmount, useCustomAmount]);

  const handleAmountSelect = useCallback((amount: number) => {
    setSelectedAmount(amount);
    setUseCustomAmount(false);
    setCustomAmount("");
  }, []);

  const handleCustomAmountChange = useCallback((value: string) => {
    setCustomAmount(value);
    if (value) {
      setUseCustomAmount(true);
    }
  }, []);

  const handleCustomAmountFocus = useCallback(() => {
    setUseCustomAmount(true);
  }, []);

  // Close on escape key and prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  // Portal the modal to document.body to avoid z-index and overflow issues
  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - centered both horizontally and vertically */}
      <div
        className="relative w-full max-w-md rounded-[30px] p-8"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,1)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-[var(--fid-color)] transition-all hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">❤️</span>
            <h2
              className="text-xl text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600
              }}
            >
              Tip the Developer
            </h2>
          </div>

          {/* Description */}
          <p className="text-center text-sm text-[var(--fid-color)]">
            Support the development of Builder Principles! Your tips help maintain and improve the app.
          </p>

          {/* Predefined amounts */}
          <div className="grid grid-cols-4 gap-2">
            {PREDEFINED_AMOUNTS.map((amount) => {
              const isSelected = !useCustomAmount && selectedAmount === amount;
              return (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition-all"
                  style={{
                    background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '2px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? 'white' : 'var(--fid-color)',
                    boxShadow: isSelected ? '0 0 20px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)' : 'none'
                  }}
                >
                  ${amount}
                </button>
              );
            })}
          </div>

          {/* Custom amount */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--fid-color)]">
              Or enter custom amount
            </p>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              onFocus={handleCustomAmountFocus}
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--fid-color)] focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>

          {/* Payment info */}
          <div
            className="space-y-2 rounded-xl p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--fid-color)]">
                Payment
              </span>
              <span className="text-sm font-semibold text-white">
                {finalAmount} USDC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--fid-color)]">
                Network
              </span>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-white">
                  Base
                </span>
              </div>
            </div>
          </div>

          {/* Send button */}
          <TipUsdc
            recipientFid={recipientFid}
            username={username}
            recipientAddress={recipientAddress}
            amount={finalAmount}
            variant="primary"
            size="lg"
            className="w-full"
            onSuccess={onClose}
          />

          {/* Disclaimer */}
          <p className="text-center text-xs text-[var(--fid-color)]">
            Payments are made in USDC on Base network
          </p>
        </div>
      </div>
    </div>
  ) : null;

  // Use portal to render modal at document.body level
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(modalContent, document.body);
}
