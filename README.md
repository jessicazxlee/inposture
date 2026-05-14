# InPosture

InPosture is a posture-monitoring system that combines on-device computer vision, real-time streaming, and haptic feedback. The project uses an iOS app to detect posture changes from the camera feed, sends posture events over WebSockets, and drives an ESP32-based wearable that vibrates when posture degrades.

This repo showcases a full-stack hardware/software workflow across mobile, backend, frontend, and embedded development.

## What It Does

- Tracks a user's posture in an iOS app using Apple's Vision framework
- Calibrates a baseline posture and detects forward slouching over time
- Sends live posture updates to a WebSocket server
- Displays posture events in a lightweight React dashboard
- Triggers graded vibration feedback on an ESP32 over BLE

## System Architecture

1. The iOS app captures camera frames and estimates posture in real time.
2. Posture state is converted into a score and "bad posture" signal.
3. The app streams those updates to a Node.js WebSocket server.
4. The server broadcasts incoming data to connected dashboard clients.
5. The iOS app also sends BLE motor levels to an ESP32-based haptic device.

## Repo Structure

```text
ios-app/           Swift iOS app for posture detection, BLE, and WebSocket updates
server/            Node.js WebSocket relay for live posture events
dashboard/         React dashboard for monitoring posture data
haptic_feedback/   ESP32 firmware for vibration motor feedback
ble_test/          Minimal BLE test sketch for device bring-up
```

## Tech Stack

- Swift, UIKit, Vision, AVFoundation, CoreBluetooth
- Node.js, `ws`
- React
- ESP32 / Arduino BLE

## Running the Project

### 1. Start the WebSocket server

```bash
cd server
npm install
node server.js
```

The server runs on `ws://localhost:3000`.

### 2. Start the dashboard

```bash
cd dashboard
npm install
npm start
```

The React app runs on `http://localhost:3001`.

### 3. Run the iOS app

Open [`ios-app/inposture2.xcodeproj`](/Users/jessicalee/Desktop/inposture/ios-app/inposture2.xcodeproj) in Xcode and run the app on a device.

Before testing on physical hardware, update the WebSocket host in [`ios-app/inposture2/ViewController.swift`](/Users/jessicalee/Desktop/inposture/ios-app/inposture2/ViewController.swift) so it matches your machine's local network IP.

### 4. Flash the ESP32 firmware

Upload [`haptic_feedback/haptic_feedback.ino`](/Users/jessicalee/Desktop/inposture/haptic_feedback/haptic_feedback.ino) to an ESP32 wired to a vibration motor driver.

## Resume-Relevant Highlights

- Built an end-to-end posture monitoring system spanning iOS, web, and embedded hardware
- Implemented real-time posture inference and baseline calibration on-device
- Integrated BLE communication from iPhone to ESP32 for low-latency haptic feedback
- Streamed live posture telemetry through a WebSocket pipeline into a browser dashboard

## Notes

- The iOS app currently uses a hardcoded LAN IP for non-simulator testing.
- The dashboard is intentionally lightweight and focused on live signal visibility rather than polished analytics.

## Future Improvements

- Persist posture sessions for trend analysis
- Add charts and summaries to the dashboard
- Replace hardcoded networking values with configuration
- Expand posture classification beyond a single slouching signal
