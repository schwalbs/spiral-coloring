import { ChangeEventHandler, FC, useContext } from "react";
import { AppStateContext } from "../../context/AppStateContext";

const SpiralControls: FC = () => {
  const { dyeStyle, set, shirt } = useContext(AppStateContext);

  const onNumSpiralsChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    set.numSpirals(parseInt(value));
  };

  const handleColorStyleChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ): void => {
    set.dyeStyle(event.currentTarget.value as "ice" | "liquid");
  };

  const handleSpiralDirectionChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ): void => {
    set.spiralDirection(event.currentTarget.value as "cw" | "ccw");
  };

  return (
    <div className="block is-flex is-gap-4">
      <fieldset className="radios">
        <legend>Dye application</legend>
        <label className="radio">
          <input
            type="radio"
            checked={dyeStyle === "liquid"}
            onChange={handleColorStyleChange}
            value="liquid"
          />
          <span className="ml-2">Liquid</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            checked={dyeStyle === "ice"}
            onChange={handleColorStyleChange}
            value="ice"
          />
          <span className="ml-2">Ice</span>
        </label>
      </fieldset>
      <div>
        <label className="is-inline-flex is-flex-direction-column">
          <span>Spiral section count</span>
          <span className="is-flex is-gap-2">
            <span className="is-size-6">{shirt.numSpirals}</span>
            <input
              type="range"
              min="2"
              max="10"
              value={shirt.numSpirals}
              onChange={onNumSpiralsChange}
            />
          </span>
        </label>
      </div>
      <fieldset className="radios">
        <legend>Spiral direction</legend>
        <label className="radio">
          <input
            type="radio"
            checked={shirt.spiralDirection === "cw"}
            onChange={handleSpiralDirectionChange}
            value="cw"
          />
          <span className="ml-2">Clockwise</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            checked={shirt.spiralDirection === "ccw"}
            onChange={handleSpiralDirectionChange}
            value="ccw"
          />
          <span className="ml-2">Counter Clockwise</span>
        </label>
      </fieldset>
    </div>
  );
};

export default SpiralControls;
