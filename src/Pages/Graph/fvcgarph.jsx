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

// const FVCGraph = () => {
//   const [port, setPort] = useState(null);
//   const [receivedData, setReceivedData] = useState('');
//   const [baudRate, setBaudRate] = useState(115200);
//   const [isConnected, setIsConnected] = useState(false);
//   const [timestamps, setTimestamps] = useState([]);
//   const [fvcData, setFvcData] = useState({ flow: [], volume: [] });

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
//     const flowRate = dr === "0" ? parseFloat(rs) : -parseFloat(rs);
//     const volume = fvcData.volume.length
//       ? fvcData.volume[fvcData.volume.length - 1] + flowRate
//       : flowRate;

//     setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]);
//     setFvcData((prev) => ({
//       flow: [...prev.flow, flowRate],
//       volume: [...prev.volume, volume],
//     }));
//   };

//   const resetData = () => {
//     setFvcData({ flow: [], volume: [] });
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
//         label: 'Flow (liters/second)',
//         data: fvcData.flow,
//         borderColor: 'blue',
//         fill: false,
//       },
//       {
//         label: 'Volume (liters)',
//         data: fvcData.volume,
//         borderColor: 'green',
//         fill: false,
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
//           text: 'Time',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Flow / Volume',
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>FVC Graph - Spirometer Data</h2>
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

//       <div style={{ height: '400px', marginTop: '20px' }}>
//         <h3>FVC Graph:</h3>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default FVCGraph;

// ***************************************************************************
// ***************************************************************************
// ***************************************************************************


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

// const FVCGraph = () => {
//   const [port, setPort] = useState(null);
//   const [receivedData, setReceivedData] = useState('');
//   const [baudRate, setBaudRate] = useState(115200);
//   const [isConnected, setIsConnected] = useState(false);
//   const [fvcData, setFvcData] = useState({ flow: [], volume: [] });

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
//         setReceivedData(text);

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
//     const flowRate = dr === "0" ? parseFloat(rs) : -parseFloat(rs); // Flow rate in L/s
//     const volume = fvcData.volume.length
//       ? fvcData.volume[fvcData.volume.length - 1] + flowRate * 0.1 // Adjust time step as needed
//       : flowRate * 0.1;

//     setFvcData((prev) => ({
//       flow: [...prev.flow, flowRate],
//       volume: [...prev.volume, volume],
//     }));
//   };

//   const resetData = () => {
//     setFvcData({ flow: [], volume: [] });
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
//     labels: fvcData.volume,  // X-axis is Volume in L
//     datasets: [
//       {
//         label: 'Flow (liters/second)',
//         data: fvcData.flow,
//         borderColor: 'blue',
//         fill: false,
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
//           text: 'Volume (liters)',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Flow (liters/second)',
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>FVC Graph - Flow vs. Volume</h2>
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

//       <div style={{ height: '400px', marginTop: '20px' }}>
//         <h3>Flow vs. Volume Graph:</h3>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default FVCGraph;


// ***************************************************************************
// ***************************************************************************
// ***************************************************************************


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

const FVCGraph = () => {
  const [port, setPort] = useState(null);
  const [receivedData, setReceivedData] = useState('');
  const [baudRate, setBaudRate] = useState(115200);
  const [isConnected, setIsConnected] = useState(false);
  const [fvcData, setFvcData] = useState({ flow: [], volume: [] });

  const baudRates = [9600, 19200, 38400, 57600, 115200];

  const connectToPort = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: baudRate });
      setPort(selectedPort);
      setIsConnected(true);
      resetData();
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
        setReceivedData(text); // Display raw data for debugging

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
    // Convert rotation per second (rs) to flow rate based on direction (dr)
    const flowRate = dr === "0" ? parseFloat(rs) : -parseFloat(rs);

    // Calculate volume based on accumulated flow rate
    const volume = fvcData.volume.length
      ? fvcData.volume[fvcData.volume.length - 1] + flowRate * 0.1 // Assume 0.1 sec intervals
      : flowRate * 0.1;

    setFvcData((prev) => ({
      flow: [...prev.flow, flowRate],
      volume: [...prev.volume, volume],
    }));
  };

  const resetData = () => {
    setFvcData({ flow: [], volume: [] });
    setReceivedData('');
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
    labels: fvcData.volume.map((_, index) => index), // Simple index labels for debugging
    datasets: [
      {
        label: 'Flow (L/s)',
        data: fvcData.flow,
        borderColor: 'red',
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
          text: 'Volume (L)',
        },
        min: -100,
        max: 150, // Adjusted for the volume range
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Flow (L/s)',
        },
        min: -100,
        max: 100, // Adjusted for the flow range
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div>
      <h2>FVC Graph - Flow vs. Volume</h2>
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
        <h3>Flow vs. Volume Graph:</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FVCGraph;
