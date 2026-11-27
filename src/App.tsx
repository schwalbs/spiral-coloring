import { type FC } from "react";
import DyePlacementDiagram from "./features/DyePlacementDiagram";
import Companies from "./features/Companies";
import Shirt from "./features/Shirt";
import Options from "./features/Options";
import SpiralControls from "./features/SpiralControls";
import { AppStateContextProvider } from "./context/AppStateContext";
import AppLayout from "./shared/ui/AppLayout";
import { parseAppStateFromUrl } from "./utils/url";

const initialAppState = parseAppStateFromUrl(window.location.href);

const App: FC = () => {
  return (
    <AppStateContextProvider initialState={initialAppState}>
      <AppLayout
        foldedShirt={<DyePlacementDiagram />}
        resultShirt={<Shirt />}
        options={<Options />}
        controls={<SpiralControls />}
        companies={<Companies />}
      />
    </AppStateContextProvider>
  );
};

export default App;
