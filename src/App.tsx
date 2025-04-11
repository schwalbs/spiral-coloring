import { type FC } from "react";
import DyePlacementDiagram from "./components/DyePlacementDiagram";
import Colors from "./components/Colors";
import { SelectedColorContextProvider } from "./context/selectedColorContext";
import Shirt from "./components/Shirt/Shirt";
import { SpiralsContextProvider } from "./context/spiralsContext";
import SpiralControls from "./components/SpiralControls";

import "./App.css";

const App: FC = () => {
  return (
    <SelectedColorContextProvider>
      <SpiralsContextProvider>
        <section className="section main-content p-0">
          <div className="shirt-output-container is-flex is-flex-direction-column is-align-items-stretch p-4 is-gap-4">
            <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2">
              Folded shirt
              <DyePlacementDiagram />
            </div>
            <div className="is-flex is-flex-direction-column is-align-items-center is-gap-2">
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
      </SpiralsContextProvider>
    </SelectedColorContextProvider>
  );
};

export default App;
