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
    <div className="d-flex gap-4">
      <fieldset className="flex-shrink-0">
        <legend>Dye application</legend>
        <div className="form-check">
          <input
            type="radio"
            checked={dyeStyle === "liquid"}
            onChange={handleColorStyleChange}
            value="liquid"
            className="form-check-input"
          />
          <span className="form-check-label ms-2">Liquid</span>
        </div>
        <div className="form-check">
          <input
            type="radio"
            checked={dyeStyle === "ice"}
            onChange={handleColorStyleChange}
            value="ice"
            className="form-check-input"
          />
          <span className="form-check-label ms-2">Ice</span>
        </div>
      </fieldset>

      <fieldset className="flex-shrink-0">
        <legend>Spiral secion count</legend>
        <div className="d-flex gap-2">
          <span className="medium">{shirt.numSpirals}</span>
          <input
            type="range"
            min="2"
            max="10"
            value={shirt.numSpirals}
            onChange={onNumSpiralsChange}
            className="form-range"
          />
        </div>
      </fieldset>
      <fieldset className="flex-shrink-0">
        <legend>Spiral direction</legend>
        <div className="form-check">
          <input
            type="radio"
            checked={shirt.spiralDirection === "cw"}
            onChange={handleSpiralDirectionChange}
            value="cw"
            className="form-check-input"
          />
          <span className="form-check-label ms-2">Clockwise</span>
        </div>
        <div className="form-check">
          <input
            type="radio"
            checked={shirt.spiralDirection === "ccw"}
            onChange={handleSpiralDirectionChange}
            value="ccw"
            className="form-check-input"
          />
          <span className="form-check-label ms-2">Counter Clockwise</span>
        </div>
      </fieldset>
    </div>
  );
};

export default SpiralControls;
