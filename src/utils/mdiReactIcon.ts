import type { Icon as IconValue } from "@mdi/react";
import IconImport from "@mdi/react";

type IconComponent = typeof IconValue;
type IconModule = { default?: IconComponent };

const Icon =
  (IconImport as unknown as IconModule).default ??
  (IconImport as unknown as IconComponent);

export default Icon;
