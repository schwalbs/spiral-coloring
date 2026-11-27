import type { FC, KeyboardEvent } from "react";

type DiagramSectionShape =
  { kind: "circle"; diameter: number } | { kind: "slice"; path: string };

interface DiagramSectionProps {
  shape: DiagramSectionShape;
  /** Zero-based index of this section. */
  section: number;
  total: number;
  /** Hex color the section is dyed, if any. */
  hexCode?: string;
  /** Whether the section can be clicked and focused. */
  isInteractive?: boolean;
  onSelect: (section: number) => void;
}

const EMPTY_STROKE = "#14161a";
const EMPTY_FILL = "#fff";

const getLabel = (section: number, total: number): string =>
  total === 1 ? "Whole shirt" : `Section ${section + 1} of ${total}`;

/** One clickable, keyboard-focusable region of the folded-shirt diagram. */
const DiagramSection: FC<DiagramSectionProps> = ({
  shape,
  section,
  total,
  hexCode,
  isInteractive = true,
  onSelect,
}) => {
  const handleKeyDown = (event: KeyboardEvent<SVGElement>): void => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onSelect(section);
  };

  const interactiveProps = isInteractive
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": getLabel(section, total),
        className: "outline-none focus-ring-svg",
        pointerEvents: "all",
        cursor: "pointer",
        onClick: () => onSelect(section),
        onKeyDown: handleKeyDown,
      }
    : { pointerEvents: "none" };

  if (shape.kind === "circle") {
    const radius = shape.diameter / 2;

    return (
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        strokeWidth="4"
        fill={hexCode ?? EMPTY_FILL}
        {...interactiveProps}
      />
    );
  }

  return (
    <path
      d={shape.path}
      stroke={hexCode ?? EMPTY_STROKE}
      fill={hexCode ?? "none"}
      {...interactiveProps}
    />
  );
};

export default DiagramSection;
