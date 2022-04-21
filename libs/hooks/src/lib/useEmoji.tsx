import React from "react";
import { parse } from "twemoji-parser";

/**
 * Create an emoji react component. If trying to inline with text,
 * put the emoji component and text in the same div, and className
 * "flex items-center". Also would give the emoji component a slight
 * margin (~0.25rem).
 * @param emoji The emoji itself, i.e. 🍆
 * @param textSize sets the width of the emoji.
 */
export function useEmoji(
  emoji: string | null,
  textSize: string,
): React.FC<{ className?: string }>;
export function useEmoji(
  emoji: string | null,
  textSize: string,
): React.FC<{ className?: string }> {
  if (!emoji) {
    const InlineEmoji: React.FC<{ className?: string }> = ({ className }) =>
      null;
    return InlineEmoji;
  }
  const URL = parse(emoji)[0]?.url;
  const InlineEmoji: React.FC<{ className?: string }> = ({ className }) => (
    <img
      src={URL}
      alt=""
      draggable={false}
      style={{ width: textSize }}
      width={textSize}
      className={"inline " + className}
    />
  );
  return InlineEmoji;
}
