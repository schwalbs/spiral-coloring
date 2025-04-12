import { type FC } from "react";
import DyePlacementDiagram from "./components/DyePlacementDiagram";
import Colors from "./components/Colors";
import Shirt from "./components/Shirt/Shirt";
import SpiralControls from "./components/SpiralControls";

import "./App.css";
import { AppStateContextProvider } from "./context/appStateContext";

const App: FC = () => {
  return (
    <AppStateContextProvider>
      <section className="section main-content p-0">
        <div className="shirt-output-container is-flex p-4 is-gap-4">
          <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2 is-flex-grow-1">
            Folded shirt
            <DyePlacementDiagram />
          </div>
          <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2 is-flex-grow-1">
            Result
            <Shirt />
          </div>
        </div>
        <div className="controls-container p-4">
          <SpiralControls />
        </div>
        <div className="colors-container p-4">
          <Colors />
        </div>
      </section>
    </AppStateContextProvider>
  );
};

export default App;
