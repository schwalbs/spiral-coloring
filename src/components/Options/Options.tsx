import { FC, useContext, useEffect, useRef, useState } from "react";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { AppStateContext } from "../../context/AppStateContext";
import { getAppStateURL } from "../../utils/url";

const Options: FC = () => {
  const appState = useContext(AppStateContext);
  const { shirt, set } = appState;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    menuRef.current?.focus();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
    <div className={`dropdown ${isOpen ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          className="button is-small"
          aria-haspopup
          aria-controls="options-menu"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Icon path={mdiDotsVertical} className="icon is-small" />
        </button>
      </div>
      <div
        ref={menuRef}
        className="dropdown-menu"
        id="options-menu"
        role="menu"
        tabIndex={0}
      >
        <div className="dropdown-content">
          <button
            className="dropdown-item"
            type="button"
            onClick={clearShirtColors}
          >
            Remove all colors
          </button>
          {/* <button
            className="dropdown-item"
            type="button"
            onClick={copyDesignURL}
          >
            Download pattern
          </button> */}
          <button
            className="dropdown-item"
            type="button"
            onClick={copyDesignURL}
          >
            Copy link with pattern
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
