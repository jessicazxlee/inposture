import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        setMessage(JSON.parse(event.data));
      } catch {
        setMessage({ raw: event.data });
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>InPosture Dashboard</h1>

      <p>
        This dashboard displays posture data streamed live from the iOS posture
        tracking app. The app sends pose analysis results to the WebSocket
        server, which then broadcasts them to this interface.
      </p>

      <h3>Status</h3>
      <p>
        WebSocket Connection:{" "}
        <strong>{connected ? "Connected 🟢" : "Disconnected 🔴"}</strong>
      </p>

      <h3>Latest Posture Signal</h3>
      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          fontFamily: "monospace",
        }}
      >
        {message ? JSON.stringify(message, null, 2) : "Waiting for posture data..."}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <p style={{ color: "#777" }}>
        Waiting for data from the iOS posture tracking application...
      </p>
    </div>
  );
}

export default App;
