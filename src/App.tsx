import { type FC } from "react";
import DyePlacementDiagram from "./components/DyePlacementDiagram";
import Colors from "./components/Colors";
import Shirt from "./components/Shirt/Shirt";
import SpiralControls from "./components/SpiralControls";
import { AppStateContextProvider } from "./context/AppStateContext";
import styles from "./App.module.css";

const App: FC = () => {
  return (
    <AppStateContextProvider>
      <section className={`${styles.mainContent} section p-0`}>
        <div className={`${styles.shirtOutputContainer} is-flex p-4 is-gap-4`}>
          <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2 is-flex-grow-1">
            Folded shirt
            <DyePlacementDiagram />
          </div>
          <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2 is-flex-grow-1">
            Result
            <Shirt />
          </div>
        </div>
        <div className={`${styles.controlsContainer} p-4`}>
          <SpiralControls />
        </div>
        <div className={`${styles.colorsContainer} px-4`}>
          <Colors />
        </div>
      </section>
    </AppStateContextProvider>
  );
};

export default App;
