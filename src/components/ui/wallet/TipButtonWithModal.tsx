"use client";

import { useState } from "react";
import { Button } from "../Button";
import { TipModal } from "./TipModal";
import { useHaptics } from "~/hooks/useHaptics";

type TipButtonWithModalProps = {
  recipientFid?: number;
  username?: string;
  recipientAddress?: `0x${string}`;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  buttonText?: string;
};

/**
 * TipButtonWithModal component provides a button that opens a tip modal.
 *
 * This component combines a button trigger with the TipModal for a complete
 * tipping experience with predefined amounts and custom input.
 */
export function TipButtonWithModal({
  recipientFid = 1356870,
  username,
  recipientAddress = "0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad",
  className,
  variant = "secondary",
  size = "md",
  buttonText = "Tip",
}: TipButtonWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerSelection } = useHaptics();

  return (
    <>
      <Button
        onClick={() => {
          triggerSelection();
          setIsModalOpen(true);
        }}
        variant={variant}
        size={size}
        className={className}
        data-tip
      >
        {buttonText}
      </Button>
      <TipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipientFid={recipientFid}
        username={username}
        recipientAddress={recipientAddress}
      />
    </>
  );
}
