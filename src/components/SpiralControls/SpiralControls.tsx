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

  return (
    <div className="block spiral-controls is-flex is-gap-4">
      <fieldset className="radios">
        <legend>Dye application</legend>
        <label className="radio">
          <input
            type="radio"
            checked={dyeStyle === "liquid"}
            onChange={handleColorStyleChange}
            value="liquid"
          />
          Liquid
        </label>
        <label className="radio">
          <input
            type="radio"
            checked={dyeStyle === "ice"}
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
    </div>
  );
};

export default SpiralControls;
