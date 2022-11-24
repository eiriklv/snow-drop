import React from "react";
import "./App.css";
import randomSeed from "random-seed";
import * as modulo from "mod-op";

function createArray(len, val) {
  return Array(len).fill(val);
}

class Layer extends React.Component {
  constructor(props) {
    super(props);

    this.rand = randomSeed.create();
  }

  render() {
    const rand = this.rand;
    rand.initState();

    const { time, rows, columns, size, speed } = this.props;

    const verticalSpeed = speed;
    const verticalAmplitude = 5;
    const horizontalSpeed = 0.2;
    const horizontalAmplitude = 2;
    const horizontalPhase = 1000000;
    const snowFlakes = createArray(rows, createArray(columns));

    const snowFlakeElements = snowFlakes
      .map((row, rowIndex) => {
        return row.map((flake, flakeIndex) => {
          const verticalOffset =
            rowIndex * (100 / snowFlakes.length) +
            rand.floatBetween(-verticalAmplitude, verticalAmplitude);
          const verticalPosition =
            ((verticalSpeed * time) / 100 + verticalOffset) % 100;
          const horizontalOffset =
            horizontalAmplitude *
            Math.sin(
              (horizontalSpeed *
                (time +
                  (rowIndex * horizontalPhase) / 100 +
                  (flakeIndex * horizontalPhase) / 100)) /
                100
            );
          const horizontalPosition = modulo(
            flakeIndex * (100 / row.length) + horizontalOffset,
            100
          );

          const flakeStyles = {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            left: horizontalPosition + "vw",
            top: verticalPosition + "vh",
            backgroundColor: "white",
          };

          return <div key={`${rowIndex}-${flakeIndex}`} style={flakeStyles} />;
        });
      })
      .flat();

    const outerContainerStyles = {
      width: "100vw",
      height: "100vh",
      background: "transparent",
      position: "absolute",
    };

    return <div style={outerContainerStyles}>{snowFlakeElements}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    this.setState(
      {
        time: Date.now(),
      },
      () => requestAnimationFrame(this.tick)
    );
  }

  render() {
    const { time } = this.state;

    const outerContainerStyles = {
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(173deg, black, transparent)",
      position: "relative",
      overflow: "hidden",
    };

    const layerCount = 5;
    const size = 1;
    const layers = createArray(layerCount);
    const speed = 0.2;
    const resolution = 20;

    const layerElements = layers.map((layer, layerIndex) => (
      <Layer
        key={layerIndex}
        time={time}
        speed={speed * (layerIndex + 1)}
        size={size * (layerIndex + 1)}
        rows={Math.round(
          resolution - (layerIndex / (layerCount + 1)) * resolution
        )}
        columns={Math.round(
          resolution - (layerIndex / (layerCount + 1)) * resolution
        )}
      />
    ));

    return (
      <div style={outerContainerStyles}>
        <Ground />
        <Tree left={100} top={100} scale={1.2} />
        {layerElements}
      </div>
    );
  }
}

const Ground = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "-25vw",
        top: "calc(50vh - 200px)",
        width: "150vw",
        height: 340,
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          left: 0,
          top: 400,
          width: "150vw",
          height: 800,
          backgroundColor: "beige",
        }}
      ></div>
    </div>
  );
}

const Tree = ({ left = 0, top = 0, scale = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50vw - ${left}px)`,
        top: `calc(50vh - ${top}px)`,
        width: 200,
        height: 340,
        backgroundColor: "transparent",
        transform: `scale(${scale})`
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 260,
            boxShadow: "rgb(0 0 0 / 17%) 0px 15px 10px -15px",
            width: 40,
            height: 40,
            backgroundColor: "brown",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 160,
            boxShadow: "rgb(0 0 0 / 17%) 0px 15px 10px -15px",
            borderLeft: "100px solid transparent",
            borderRight: "100px solid transparent",
            borderBottom: "100px solid green",
            backgroundColor: "transparent",
            width: 0,
            height: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "12%",
            top: 100,
            boxShadow: "rgb(0 0 0 / 17%) 0px 15px 10px -15px",
            borderLeft: "75px solid transparent",
            borderRight: "75px solid transparent",
            borderBottom: "100px solid green",
            backgroundColor: "transparent",
            width: 0,
            height: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "24%",
            top: 40,
            boxShadow: "rgb(0 0 0 / 17%) 0px 15px 10px -15px",
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "100px solid green",
            backgroundColor: "transparent",
            width: 0,
            height: 0,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
