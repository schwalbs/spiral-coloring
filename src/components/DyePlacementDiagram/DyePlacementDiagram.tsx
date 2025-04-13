import { useContext, type FC } from "react";
import { AppStateContext } from "../../context/AppStateContext";
import styles from "./DyePlacementDiagram.module.css";

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

  const handleSectionClick = (section: number): void => {
    if (!selectedColor) {
      return;
    }

    set.spiralColor(section, selectedColor);
  };

  return (
    <div className={styles.container}>
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
          className={styles.slicePath}
          fill={
            shirt.numSpirals === 1 && shirt.spirals[0]
              ? shirt.spirals[0].hexCode
              : "#fff"
          }
          onClick={() => handleSectionClick(0)}
        />
        {shirt.numSpirals > 1 &&
          Array.from({ length: shirt.numSpirals }).map((_, section) => {
            const radiansPerSection = (2 * Math.PI) / shirt.numSpirals;
            const arcStartXY = getXYFromRadians(radiansPerSection * section);
            const arcEndXY = getXYFromRadians(
              radiansPerSection * (section + 1),
            );
            const spiral = shirt.spirals[section];

            return (
              <path
                className={styles.slicePath}
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
