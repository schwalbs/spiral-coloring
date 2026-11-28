import { FC, useContext } from "react";
import {
  Fieldset,
  Inline,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Text,
} from "@schwalbs/friggle-components";
import { AppStateContext } from "../../context/AppStateContext";

const MIN_SPIRALS = 2;
const MAX_SPIRALS = 10;

const SpiralControls: FC = () => {
  const { dyeStyle, set, shirt } = useContext(AppStateContext);

  const handleDyeStyleChange = (value: string): void => {
    set.dyeStyle(value as "ice" | "liquid");
  };

  const handleNumSpiralsChange = (value: number | readonly number[]): void => {
    if (typeof value !== "number") {
      return;
    }
    set.numSpirals(value);
  };

  const handleSpiralDirectionChange = (value: string): void => {
    set.spiralDirection(value as "cw" | "ccw");
  };

  return (
    <Inline gap={6} align="start">
      <Fieldset legend="Dye application">
        <RadioGroup
          label="Dye application"
          value={dyeStyle}
          onValueChange={handleDyeStyleChange}
        >
          <RadioGroupItem value="liquid">Liquid</RadioGroupItem>
          <RadioGroupItem value="ice">Ice</RadioGroupItem>
        </RadioGroup>
      </Fieldset>

      <Fieldset legend="Spiral section count">
        <Inline gap={3}>
          <Text as="span" strong>
            {shirt.numSpirals}
          </Text>
          <Slider
            label="Spiral section count"
            min={MIN_SPIRALS}
            max={MAX_SPIRALS}
            value={shirt.numSpirals}
            onValueChange={handleNumSpiralsChange}
            className="w-40"
          />
        </Inline>
      </Fieldset>

      <Fieldset legend="Spiral direction">
        <RadioGroup
          label="Spiral direction"
          value={shirt.spiralDirection}
          onValueChange={handleSpiralDirectionChange}
        >
          <RadioGroupItem value="cw">Clockwise</RadioGroupItem>
          <RadioGroupItem value="ccw">Counter Clockwise</RadioGroupItem>
        </RadioGroup>
      </Fieldset>
    </Inline>
  );
};

export default SpiralControls;
