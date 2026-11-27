import { type FC, type ReactNode } from "react";

/** Responsive grid of color swatches: three columns on small screens, auto-fit from `md`. */
const SwatchGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-3 gap-2 px-4 py-1 md:grid-cols-auto-fit">
    {children}
  </div>
);

export default SwatchGrid;
