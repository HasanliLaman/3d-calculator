import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  useCursor,
} from "@react-three/drei";
import { useState, useEffect } from "react";
import CalculatorUtils from "./utils/CalculatorUtils";
import { Calculator } from "./components/Calculator";

function App() {
  const [display, setDisplay] = useState("");
  const [isFloating, setIsFloating] = useState(true);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const onCalculate = () => {
    const result = CalculatorUtils.calculate(display.replaceAll("x", "*"));
    setDisplay("" + result);
  };

  const onOperation = (operation) => {
    const result = CalculatorUtils.calculate(display.replaceAll("x", "*"));
    if (display.match(/[\d][x+/-][\d]/g)) {
      setDisplay(!isNaN(Number(result)) ? result + operation : result);
      return;
    }
    setDisplay((prev) => prev + operation);
  };

  return (
    <>
      <div className="floating-switch">
        <label htmlFor="floating">Stop Floating</label>
        <label className="switch">
          <input
            value={isFloating}
            onClick={() => setIsFloating(!isFloating)}
            type="checkbox"
            id="floating"
          />
          <span className="slider round"></span>
        </label>
      </div>
      <Canvas shadows camera={{ fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-mapSize={2048}
          castShadow
        />
        {isFloating ? (
          <Float speed={1.7}>
            <Calculator
              setDisplay={setDisplay}
              display={display}
              onCalculate={onCalculate}
              onOperation={onOperation}
              setHovered={setHovered}
              scale={[0.0013, 0.0013, 0.0013]}
            />
          </Float>
        ) : (
          <Calculator
            setDisplay={setDisplay}
            display={display}
            setHovered={setHovered}
            onCalculate={onCalculate}
            onOperation={onOperation}
            scale={[0.0013, 0.0013, 0.0013]}
          />
        )}
        <ContactShadows
          resolution={1024}
          scale={15}
          position={[0, -0.95, 0]}
          blur={0.8}
          opacity={0.7}
          far={30}
          color="#777"
        />
        <Environment path="./hdri/" files="potsdamer_platz_1k.hdr" />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </>
  );
}

export default App;
