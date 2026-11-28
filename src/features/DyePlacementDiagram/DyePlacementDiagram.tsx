import { useContext, type FC } from "react";
import { AppStateContext } from "../../context/AppStateContext";
import DiagramSection from "../../shared/ui/DiagramSection";

const VIEW_BOX_SIZE = 500;
const SPIRAL_RADIUS = VIEW_BOX_SIZE / 2;
const SPIRAL_CENTER = `${VIEW_BOX_SIZE / 2},${VIEW_BOX_SIZE / 2}`;
const getXYFromRadians = (radians: number): [number, number] => {
  return [
    Math.cos(radians) * SPIRAL_RADIUS + SPIRAL_RADIUS,
    Math.sin(radians) * SPIRAL_RADIUS + SPIRAL_RADIUS,
  ];
};

const DyePlacementDiagram: FC = () => {
  const { selectedColor, set, shirt } = useContext(AppStateContext);
  const { numSpirals, spirals } = shirt;

  const handleSectionClick = (section: number): void => {
    if (!selectedColor) {
      return;
    }

    set.spiralColor(section, selectedColor);
  };

  const radiansPerSection = (2 * Math.PI) / numSpirals;

  return (
    <div className="aspect-square h-3/4 w-3/4">
      <svg
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="0.5"
        fill="transparent"
      >
        <DiagramSection
          shape={{ kind: "circle", diameter: VIEW_BOX_SIZE }}
          section={0}
          total={numSpirals}
          hexCode={numSpirals === 1 ? spirals[0]?.hexCode : undefined}
          isInteractive={numSpirals === 1}
          onSelect={handleSectionClick}
        />
        {numSpirals > 1 &&
          Array.from({ length: numSpirals }).map((_, section) => {
            const arcStartXY = getXYFromRadians(radiansPerSection * section);
            const arcEndXY = getXYFromRadians(
              radiansPerSection * (section + 1),
            );

            return (
              <DiagramSection
                key={section}
                shape={{
                  kind: "slice",
                  path: `M ${SPIRAL_CENTER} L ${arcStartXY.join(",")} A ${SPIRAL_CENTER},0,0,1,${arcEndXY.join(",")} z`,
                }}
                section={section}
                total={numSpirals}
                hexCode={spirals[section]?.hexCode}
                onSelect={handleSectionClick}
              />
            );
          })}
      </svg>
    </div>
  );
};

export default DyePlacementDiagram;
