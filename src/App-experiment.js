import React from 'react';
import './App.css';
import randomSeed from 'random-seed';

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

    const { time, rows, columns, size, vSpeed, hSpeed, hAmplitude } = this.props;
    const verticalSpeed = vSpeed;
    const verticalAmplitude = 5;
    const horizontalFrequency = 0.2;
    const horizontalAmplitude = hAmplitude;
    const horizontalPhase = 1000000;
    const horizontalSpeed = hSpeed;
    const snowFlakes = createArray(rows, createArray(columns));

    const snowFlakeElements = snowFlakes
    .map((row, rowIndex) => {
      return row.map((flake, flakeIndex) => {
        const randomizedVerticalSpeed = verticalSpeed + rand.floatBetween(-0.0 * verticalSpeed, 0.0 * verticalSpeed);
        const verticalOffset = (rowIndex * (100 / (snowFlakes.length))) + rand.floatBetween(-verticalAmplitude, verticalAmplitude);
        const verticalPosition = ((randomizedVerticalSpeed * time / 100) + verticalOffset) % 100;
        const horizontalOffset = horizontalAmplitude * Math.sin(horizontalFrequency * (time + (rowIndex * horizontalPhase / 100) + (flakeIndex * horizontalPhase / 100)) / 100) + (horizontalSpeed * time / 100);
        const horizontalPosition = (flakeIndex * (100 / (row.length)) + horizontalOffset + rand.floatBetween(- 0.0 * (100 / snowFlakes.length), 0.0 * (100 / snowFlakes.length))) % 100;

        const flakeStyles = {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          left: horizontalPosition + 'vw',
          top: verticalPosition + 'vh',
          backgroundColor: 'white'
        }

        return (
          <div
            key={`${rowIndex}-${flakeIndex}`}
            style={flakeStyles}
          />
        );
      });
    })
    .flat();

    const outerContainerStyles = {
      width: '100vw',
      height: '100vh',
      background: 'transparent',
      position: 'absolute',
      opacity: 0.9,
    };

    return (
      <div style={outerContainerStyles}>
        {snowFlakeElements}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now()
    }

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    this.setState({
      time: Date.now()
    }, () => requestAnimationFrame(this.tick));
  }

  render() {
    const { time } = this.state;

    const outerContainerStyles = {
      width: '100vw',
      height: '100vh',
      background: '#115',
      position: 'relative',
    };

    return (
      <div style={outerContainerStyles}>
        <Layer
          time={time}
          vSpeed={0.3}
          hSpeed={0.2}
          hAmplitude={0.2}
          size={1}
          rows={20}
          columns={20}
        />
        <Layer
          time={time}
          vSpeed={0.5}
          hSpeed={0.4}
          hAmplitude={0.5}
          size={3}
          rows={15}
          columns={15}
        />
        <Layer
          time={time}
          vSpeed={0.8}
          hSpeed={0.6}
          hAmplitude={1}
          size={5}
          rows={12}
          columns={12}
        />
        <Layer
          time={time}
          vSpeed={1}
          hSpeed={0.8}
          hAmplitude={2}
          size={7}
          rows={5}
          columns={5}
        />
      </div>
    );
  }
}

export default App;
