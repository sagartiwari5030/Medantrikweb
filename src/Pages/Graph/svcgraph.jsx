// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// const SVCGraph = () => {
//   const [port, setPort] = useState(null);
//   const [receivedData, setReceivedData] = useState('');
//   const [baudRate, setBaudRate] = useState(115200);
//   const [isConnected, setIsConnected] = useState(false);
//   const [timestamps, setTimestamps] = useState([]);
//   const [volumeData, setVolumeData] = useState([]);

//   const baudRates = [9600, 19200, 38400, 57600, 115200];

//   const connectToPort = async () => {
//     try {
//       const selectedPort = await navigator.serial.requestPort();
//       await selectedPort.open({ baudRate: baudRate });
//       setPort(selectedPort);
//       setIsConnected(true);
//       resetData(); // Clear previous data when a new connection is made
//       readData(selectedPort);
//     } catch (error) {
//       console.error('Error connecting to serial port:', error);
//       setIsConnected(false);
//     }
//   };

//   const readData = async (port) => {
//     const reader = port.readable.getReader();
//     try {
//       while (port.readable) {
//         const { value, done } = await reader.read();
//         if (done) break;

//         const textDecoder = new TextDecoder();
//         const text = textDecoder.decode(value);
//         console.log("Received data:", text);
//         setReceivedData(text); // Show only the latest data

//         // Parse JSON data
//         try {
//           const jsonData = JSON.parse(text);
//           processSpirometerData(jsonData);
//         } catch (error) {
//           console.error('Invalid JSON data:', error);
//         }
//       }
//     } catch (error) {
//       console.error('Error reading data:', error);
//     } finally {
//       reader.releaseLock();
//     }
//   };

//   const processSpirometerData = ({ dr, rs }) => {
//     // Assume each data point arrives at a fixed interval (e.g., 0.1 seconds)
//     const timeInterval = 0.1; // seconds
//     const flowRate = dr === "0" ? parseFloat(rs) : -parseFloat(rs);
//     const volumeChange = flowRate * timeInterval;
//     const newVolume = volumeData.length
//       ? volumeData[volumeData.length - 1] + volumeChange
//       : volumeChange;

//     setTimestamps((prev) => [...prev, (prev.length * timeInterval).toFixed(1)]);
//     setVolumeData((prev) => [...prev, newVolume]);
//   };

//   const resetData = () => {
//     setVolumeData([]);
//     setTimestamps([]);
//     setReceivedData('');
//   };

//   const disconnectPort = async () => {
//     if (port) {
//       await port.close();
//       setPort(null);
//       setIsConnected(false);
//       resetData();
//     }
//   };

//   const sendStartMeasurement = async () => {
//     if (port && port.writable) {
//       const writer = port.writable.getWriter();
//       const encoder = new TextEncoder();
//       await writer.write(encoder.encode("api2")); // Send "api2" command to start measurement
//       writer.releaseLock();
//       console.log("Sent 'startMeasurement' command to device.");
//     } else {
//       console.error('Port is not writable');
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (port) {
//         port.close();
//       }
//     };
//   }, [port]);

//   const chartData = {
//     labels: timestamps,
//     datasets: [
//       {
//         label: 'Volume (L)',
//         data: volumeData,
//         borderColor: 'green',
//         borderWidth: 2,
//         pointRadius: 1,
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time (s)',
//         },
//         min: 0,
//         max: timestamps.length * 1, // Update the max value based on time length
//         ticks: {
//           stepSize: 1,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Volume (L)',
//         },
//         min: -100,
//         max: 100, // Set a maximum expected volume for the test
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>SVC Graph - Volume vs. Time</h2>
//       <div>
//         <label htmlFor="baudRate">Baud Rate: </label>
//         <select
//           id="baudRate"
//           value={baudRate}
//           onChange={(e) => setBaudRate(parseInt(e.target.value))}
//           disabled={isConnected}
//         >
//           {baudRates.map((rate) => (
//             <option key={rate} value={rate}>
//               {rate}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={isConnected ? disconnectPort : connectToPort}>
//         {isConnected ? 'Disconnect' : 'Connect to Device'}
//       </button>

//       {isConnected && (
//         <div>
//           <button onClick={sendStartMeasurement}>
//             Start Measurement
//           </button>
//         </div>
//       )}

//       <div>
//         <h3>Received Data:</h3>
//         <pre style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
//           {receivedData}
//         </pre>
//       </div>

//       <div style={{ height: '1000px', marginTop: '20px' }}>
//         <h3>Volume vs. Time Graph:</h3>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default SVCGraph;



import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SVCGraph = () => {
  const [port, setPort] = useState(null);
  const [receivedData, setReceivedData] = useState('');
  const [baudRate, setBaudRate] = useState(115200);
  const [isConnected, setIsConnected] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0); // Track cumulative time

  const baudRates = [9600, 19200, 38400, 57600, 115200];
  const timeInterval = 0.1; // Time interval in seconds for each data point

  const connectToPort = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: baudRate });
      setPort(selectedPort);
      setIsConnected(true);
      resetData(); // Clear previous data when a new connection is made
      readData(selectedPort);
    } catch (error) {
      console.error('Error connecting to serial port:', error);
      setIsConnected(false);
    }
  };

  const readData = async (port) => {
    const reader = port.readable.getReader();
    try {
      while (port.readable) {
        const { value, done } = await reader.read();
        if (done) break;

        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(value);
        console.log("Received data:", text);
        setReceivedData(text); // Show only the latest data

        // Parse JSON data
        try {
          const jsonData = JSON.parse(text);
          processSpirometerData(jsonData);
        } catch (error) {
          console.error('Invalid JSON data:', error);
        }
      }
    } catch (error) {
      console.error('Error reading data:', error);
    } finally {
      reader.releaseLock();
    }
  };

  const processSpirometerData = ({ dr, rs }) => {
    const flowRate = dr === "0" ? parseFloat(rs) : -parseFloat(rs); // Positive for exhale, negative for inhale
    const volumeChange = flowRate * timeInterval; // Convert flow rate to volume change over the interval
    const newVolume = volumeData.length
      ? volumeData[volumeData.length - 1] + volumeChange
      : volumeChange;

    setTimeElapsed((prev) => prev + timeInterval); // Update time for each interval
    setTimestamps((prev) => [...prev, (prev.length * timeInterval).toFixed(1)]);
    setVolumeData((prev) => [...prev, newVolume]);
  };

  const resetData = () => {
    setVolumeData([]);
    setTimestamps([]);
    setReceivedData('');
    setTimeElapsed(0); // Reset elapsed time
  };

  const disconnectPort = async () => {
    if (port) {
      await port.close();
      setPort(null);
      setIsConnected(false);
      resetData();
    }
  };

  const sendStartMeasurement = async () => {
    if (port && port.writable) {
      const writer = port.writable.getWriter();
      const encoder = new TextEncoder();
      await writer.write(encoder.encode("api2")); // Send "api2" command to start measurement
      writer.releaseLock();
      console.log("Sent 'startMeasurement' command to device.");
    } else {
      console.error('Port is not writable');
    }
  };

  useEffect(() => {
    return () => {
      if (port) {
        port.close();
      }
    };
  }, [port]);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Volume (L)',
        data: volumeData,
        borderColor: 'green',
        borderWidth: 2,
        pointRadius: 1,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)',
        },
        min: 0,
        max: timestamps.length * 1, // Update the max value based on elapsed time
        ticks: {
          stepSize: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Volume (L)',
        },
        min: -15, // Allows for negative volume in case of inhalation
        max: 15,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div>
      <h2>SVC Graph - Volume vs. Time</h2>
      <div>
        <label htmlFor="baudRate">Baud Rate: </label>
        <select
          id="baudRate"
          value={baudRate}
          onChange={(e) => setBaudRate(parseInt(e.target.value))}
          disabled={isConnected}
        >
          {baudRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
      <button onClick={isConnected ? disconnectPort : connectToPort}>
        {isConnected ? 'Disconnect' : 'Connect to Device'}
      </button>

      {isConnected && (
        <div>
          <button onClick={sendStartMeasurement}>
            Start Measurement
          </button>
        </div>
      )}

      <div>
        <h3>Received Data:</h3>
        <pre style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {receivedData}
        </pre>
      </div>

      <div style={{ height: '400px', marginTop: '20px' }}>
        <h3>Volume vs. Time Graph:</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SVCGraph;
