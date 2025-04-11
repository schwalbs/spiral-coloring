import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { Color } from "../types/globals";

type SpiralsContextState = {
  numSpirals: number;
  setNumSpirals: (numSpirals: number) => void;
  setSpiralColor: (spiralIndex: number, color: Color) => void;
  spirals: Array<Color | undefined>;
};

export const SpiralsContext = createContext<SpiralsContextState>({
  numSpirals: 2,
  setNumSpirals: () => {},
  setSpiralColor: () => {},
  spirals: [],
});

export const SpiralsContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [spirals, setSpirals] = useState<SpiralsContextState["spirals"]>(
    Array.from({ length: 2 }),
  );

  const contextState = useMemo<SpiralsContextState>(() => {
    const setNumSpirals: SpiralsContextState["setNumSpirals"] = (
      nextNumSpirals,
    ) => {
      setSpirals((prevSpirals) => {
        if (nextNumSpirals < prevSpirals.length) {
          return prevSpirals.slice(0, nextNumSpirals);
        }

        return [...prevSpirals, undefined];
      });
    };

    const setSpiralColor: SpiralsContextState["setSpiralColor"] = (
      spiralIndex,
      color,
    ) => {
      setSpirals((prevSprials) => {
        const copy = [...prevSprials];
        copy[spiralIndex] = color;
        return copy;
      });
    };

    return {
      numSpirals: spirals.length,
      setNumSpirals,
      setSpiralColor,
      spirals,
    };
  }, [spirals]);

  return (
    <SpiralsContext.Provider value={contextState}>
      {children}
    </SpiralsContext.Provider>
  );
};
