import { DEFAULT_APP_STATE_DATA } from "../context/AppStateContext";
import { AppStateData } from "../context/AppStateContext/AppStateContext";

export const getAppStateURL = ({ shirt }: AppStateData): string => {
  const url = new URL(window.location.href);

  const filteredShirtState = {
    ...shirt,
    spirals: shirt.spirals.map((spiral) =>
      spiral ? { id: spiral.id, hexCode: spiral.hexCode } : undefined,
    ),
  };
  url.searchParams.set("pattern", JSON.stringify(filteredShirtState));

  return url.toString();
};

export const parseAppStateFromUrl = (url: string): AppStateData => {
  const parsedUrl = new URL(url);
  const patternParam = parsedUrl.searchParams.get("pattern");

  return {
    ...DEFAULT_APP_STATE_DATA,
    shirt: patternParam
      ? JSON.parse(patternParam)
      : DEFAULT_APP_STATE_DATA.shirt,
  };
};
