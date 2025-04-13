import { useContext, type FC } from "react";
import { AppStateContext } from "../../context/AppStateContext";
import buildSpiralPaths from "./buildSpiralPaths";
import { buildIceDyeSwatchUrl } from "../../utils/dharma";
import styles from "./Shirt.module.css";

const VIEWBOX_SIZE = 500;

const Shirt: FC = () => {
  const { dyeStyle, shirt } = useContext(AppStateContext);

  const { spiralFillPaths } = buildSpiralPaths({
    numSpirals: shirt.numSpirals,
    viewboxSize: VIEWBOX_SIZE,
  });

  const getSpiralFill = (spiralIndex: number): string => {
    const spiral = shirt.spirals[spiralIndex];

    if (!spiral) return "none";

    return dyeStyle === "liquid"
      ? spiral.hexCode
      : `url(#spiral-ice-img-${spiralIndex})`;
  };

  return (
    <div className={styles.shirt}>
      <svg
        className={styles.shirtSvg}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="shirt-clip-path">
            <path d="m 498.60096,182.87058 c -1.74912,1.67773 -43.19059,41.34134 -71.33657,59.55549 -1.87801,1.21401 -4.34864,0.88534 -5.84047,-0.77851 -0.25728,-0.28553 -23.15541,-25.83301 -44.16168,-51.04464 v 245.84031 c 0,2.3063 -1.73524,4.24849 -4.02716,4.50526 -0.6142,0.0714 -62.04718,6.84752 -123.23778,6.84752 -61.19059,0 -122.61691,-6.77614 -123.23059,-6.84752 -2.2991,-0.25677 -4.03384,-2.19896 -4.03384,-4.50526 V 190.60344 c -20.99906,25.21162 -43.897199,50.75859 -44.154481,51.04463 -1.492341,1.66386 -3.969647,1.99201 -5.840465,0.77852 C 44.591945,224.21243 3.1432811,184.54883 1.3941713,182.8711 -0.04835633,181.48608 -0.41245473,179.32255 0.49445307,177.5375 2.8079409,172.98909 57.479688,65.852268 82.712369,46.788205 108.24546,27.495615 190.52757,1.3128894 194.01911,0.21340486 c 1.77068,-0.5638645 3.69851,0.014379 4.87655,1.44252774 0.036,0.042623 3.6415,4.412317 9.71049,10.0530164 11.49555,10.674397 26.19711,16.557999 41.39115,16.557999 15.19404,0 29.89561,-5.883602 41.39115,-16.557999 6.06899,-5.6406994 9.68225,-10.0103927 9.71768,-10.0530164 1.17086,-1.42814864 3.10587,-1.99920274 4.86936,-1.44252774 3.49154,1.09948454 85.78084,27.28221014 111.31394,46.57480014 25.22601,19.064063 79.90442,126.200885 82.21792,130.749295 0.90742,1.78454 0.53613,3.94808 -0.90639,5.33308 z" />
          </clipPath>

          {shirt.spirals.map((color, section) => {
            if (!color) return null;

            return (
              <pattern
                id={`spiral-ice-img-${section}`}
                key={section}
                height="500"
                width="500"
                patternUnits="userSpaceOnUse"
              >
                <image
                  preserveAspectRatio="xMidYMid meet"
                  height="500"
                  width="500"
                  href={buildIceDyeSwatchUrl(color)}
                />
              </pattern>
            );
          })}
        </defs>

        {shirt.numSpirals === 1 && (
          <rect
            width={VIEWBOX_SIZE}
            height={VIEWBOX_SIZE}
            clipPath="url(#shirt-clip-path)"
            fill={shirt.spirals[0] ? getSpiralFill(0) : "#fff"}
          />
        )}

        {shirt.numSpirals > 1 && (
          <g clipPath="url(#shirt-clip-path)">
            <rect width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill="#fff" />
            {spiralFillPaths.map((path, i) => (
              <path
                key={i}
                d={path}
                style={{ color: shirt.spirals[i]?.hexCode ?? "transparent" }}
                fill={getSpiralFill(i)}
                stroke={dyeStyle === "liquid" ? "currentColor" : "none"}
                strokeWidth="1"
              />
            ))}

            {/* {spiralPaths.map((path, i) => (
              <path
                key={i}
                d={path}
                stroke={getSectionFill({
                  section: i,
                  sectionColor: spirals[i],
                  style: colorStyle,
                })}
                strokeWidth="1"
                fill="none"
              />
            ))} */}
          </g>
        )}
      </svg>
    </div>
  );
};

export default Shirt;
