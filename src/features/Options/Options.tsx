import { FC, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@schwalbs/friggle-components";
import { EllipsisVertical } from "lucide-react";
import { AppStateContext } from "../../context/AppStateContext";
import { getAppStateURL } from "../../utils/url";

const Options: FC = () => {
  const appState = useContext(AppStateContext);
  const { shirt, set } = appState;

  const clearShirtColors = () => {
    set.spiralColors(
      Array.from<undefined>({ length: shirt.numSpirals }).fill(undefined),
    );
  };

  const copyDesignURL = async () => {
    const url = getAppStateURL(appState);

    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": url.toString(),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      console.warn("Unable to copy with CliboardItem: " + error);
      console.log("[INFO] URL: " + url.toString());
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <IconButton
            icon={EllipsisVertical}
            label="Options"
            variant="outline"
            size="sm"
          />
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={clearShirtColors}>
          Remove all colors
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyDesignURL}>
          Copy link with pattern
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
