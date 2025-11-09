import { type FC } from "react";
import DyePlacementDiagram from "./components/DyePlacementDiagram";
import Companies from "./components/Companies";
import Shirt from "./components/Shirt";
import Options from "./components/Options";
import SpiralControls from "./components/SpiralControls";
import { AppStateContextProvider } from "./context/AppStateContext";
import styles from "./App.module.css";
import { parseAppStateFromUrl } from "./utils/url";

const initialAppState = parseAppStateFromUrl(window.location.href);

const App: FC = () => {
  return (
    <AppStateContextProvider initialState={initialAppState}>
      <section className={`${styles.mainContent} p-0`}>
        <div
          className={`${styles.shirtOutputContainer} d-flex p-4 gap-4 position-relative border-light`}
        >
          <div className="d-flex flex-column align-items-center gap-2 flex-grow-1">
            Folded shirt
            <DyePlacementDiagram />
          </div>
          <div className="d-flex flex-column align-items-center gap-2 flex-grow-1">
            Result
            <Shirt />
          </div>
          <div className={`position-absolute ${styles.shirtOptionsContainer}`}>
            <Options />
          </div>
        </div>
        <div className={`${styles.controlsContainer} p-4`}>
          <SpiralControls />
        </div>
        <div className={`${styles.companiesContainer}`}>
          <Companies />
        </div>
      </section>
    </AppStateContextProvider>
  );
};

export default App;
