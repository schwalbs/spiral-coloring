import { useContext, type FC } from "react";
import "./DyePlacementDiagram.css";
import { SelectedColorContext } from "../../context/selectedColorContext";
import { SpiralsContext } from "../../context/spiralsContext";

type Props = {};

const VIEW_BOX_SIZE = 500;
const SPIRAL_RADIUS = VIEW_BOX_SIZE / 2;
const SPIRAL_CENTER = `${VIEW_BOX_SIZE / 2},${VIEW_BOX_SIZE / 2}`;
const getXYFromRadians = (radians: number): [number, number] => {
  return [
    Math.cos(radians) * SPIRAL_RADIUS + SPIRAL_RADIUS,
    Math.sin(radians) * SPIRAL_RADIUS + SPIRAL_RADIUS,
  ];
};

/**
 * TODO add background to represent shirt
 * TODO rotate to reflect shirt
 */
const DyePlacementDiagram: FC<Props> = ({}) => {
  const { selectedColor } = useContext(SelectedColorContext);
  const { numSpirals, setSpiralColor, spirals } = useContext(SpiralsContext);

  const handleSectionClick = (section: number): void => {
    if (!selectedColor) {
      return;
    }

    setSpiralColor(section, selectedColor);
  };

  return (
    <div className="dye-placement-diagram">
      <svg
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="0.5"
        fill="transparent"
      >
        <circle
          cx={VIEW_BOX_SIZE / 2}
          cy={VIEW_BOX_SIZE / 2}
          r={VIEW_BOX_SIZE / 2}
          stroke="#fff"
          strokeWidth="0.5"
          className="dye-placement-diagram__slice-path"
          fill={numSpirals === 1 && spirals[0] ? spirals[0].hexCode : "#fff"}
          onClick={() => handleSectionClick(0)}
        />
        {numSpirals > 1 &&
          Array.from({ length: numSpirals }).map((_, section) => {
            const radiansPerSection = (2 * Math.PI) / numSpirals;
            const arcStartXY = getXYFromRadians(radiansPerSection * section);
            const arcEndXY = getXYFromRadians(
              radiansPerSection * (section + 1),
            );
            const spiral = spirals[section];

            return (
              <path
                className="dye-placement-diagram__slice-path"
                key={section}
                d={`M ${SPIRAL_CENTER} L ${arcStartXY.join(",")} A ${SPIRAL_CENTER},0,0,1,${arcEndXY.join(",")} z`}
                stroke={spiral ? spiral.hexCode : "#14161a"}
                fill={spiral?.hexCode ?? "none"}
                onClick={() => handleSectionClick(section)}
              />
            );
          })}
      </svg>
    </div>
  );
};

export default DyePlacementDiagram;
