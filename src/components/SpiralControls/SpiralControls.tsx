import { ChangeEventHandler, FC, useContext } from "react";
import { SpiralsContext } from "../../context/spiralsContext";
import { SelectedColorContext } from "../../context/selectedColorContext";

/**
 * TODO: add controls for spin direction, blend amount
 * TODO: add filters by color group, brand,
 * TODO: add remove color
 * TODO: add clear shirt
 */
const SpiralControls: FC = () => {
  const { colorStyle, setColorStyle } = useContext(SelectedColorContext);
  const { numSpirals, setNumSpirals } = useContext(SpiralsContext);

  const onNumSpiralsChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setNumSpirals(parseInt(value));
  };

  const handleColorStyleChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ): void => {
    setColorStyle(event.currentTarget.value as "ice" | "liquid");
  };

  return (
    <div className="block spiral-controls is-flex is-gap-4">
      <fieldset className="radios">
        <legend>Dye application</legend>
        <label className="radio">
          <input
            type="radio"
            checked={colorStyle === "liquid"}
            onChange={handleColorStyleChange}
            value="liquid"
          />
          Liquid
        </label>
        <label className="radio">
          <input
            type="radio"
            checked={colorStyle === "ice"}
            onChange={handleColorStyleChange}
            value="ice"
          />
          Ice
        </label>
      </fieldset>
      <div>
        <label className="is-inline-flex is-flex-direction-column">
          <span>Spiral section count</span>
          <span className="is-flex is-gap-2">
            <span className="is-size-6">{numSpirals}</span>
            <input
              type="range"
              min="2"
              max="10"
              value={numSpirals}
              onChange={onNumSpiralsChange}
            />
          </span>
        </label>
      </div>
    </div>
  );
};

export default SpiralControls;
