# 🍥 Domino Effect Challenge: Microservice Blast Radius Analyzer

![Microservice Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Backend](https://img.shields.io/badge/Backend-Go_Gin-00ADD8?logo=go)
![Frontend](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?logo=react)
![AI](https://img.shields.io/badge/AI-Gemini_1.5_Flash-green)
![Algorithm](https://img.shields.io/badge/Algorithm-DFS%20Graph-orange)

An intelligent microservice dependency tool designed to analyze service relationships, visualize cascading failures in real-time, and provide automated AI-driven Root Cause Analysis (RCA).

---

## 🌟 Key Features

### 1. ⚙️ Microservice Dependency Analysis
The tool parses service dependencies from a **dummy JSON file** (`sample/service.json`). 
- **Input**: A JSON array of services, each with its health status, criticality, and upstream dependencies.
- **Dynamic Analysis**: Maps the entire service ecosystem on startup.

### 2. 🕸️ Reverse Dependency Graph
Automatically converts standard dependency relationships into a **Reverse Dependency Graph**.
- **Downstream Traversal**: Identifies which services will be **broken** if a specific root service fails.
- **Graph Transformation**: "A depends on B" → "B impacts A", enabling failure propagation analysis.

### 3. 💣 Blast Radius Calculation (DFS)
Core algorithmic engine using **Depth-First Search (DFS)** to calculate impact zones.
- **Cascading Failure Simulation**: Triggers a "Domino Effect" when service health drops below a 0.7 threshold.
- **Impact Quantification**: Calculates the **Blast Radius**—the total count of downstream services affected.
- **Cycle Detection**: Built-in protection against circular dependencies.

### 4. 🧠 AI-Powered RCA Generation (Gemini)
Integrates with **Google Gemini API** for technical incident reporting.
- **Contextual Awareness**: Feeds root failure data and downstream impacts to the LLM.
- **SRE-Ready Reports**: Generates technical RCAs including dummy risk scores and remediation steps.

### 5. 🖥️ Real-time Dashboard (Frontend)
A modern, dark-themed React dashboard built with Vite and Tailwind CSS.
- **Live Topology Mesh**: Visualizes the service graph and its health status in real-time.
- **Incident Pipeline**: Displays a live feed of cascaded failures and AI-generated RCA reports via SSE.

---

## 📂 Project Structure

```bash
├── Frontend/
│   └── my-app/          # React + Vite + Tailwind Frontend
├── controllers/
│   ├── handler.go       # SSE endpoints & graph construction
│   ├── DFS.go           # DFS engine and Gemini integration
│   └── dependency.go    # Handler structures
├── models/
│   └── models.go        # Go data structures
├── sample/
│   └── service.json     # Service dependency source (JSON)
├── server/
│   └── cmd/main.go      # Backend Entry point
└── .env                 # Gemini API Key configuration
```

---

## 🛠️ Getting Started

### 1. 🔑 Configure Gemini API Key
Add your API key to the root `.env` file:
```bash
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. 🚀 Start the Backend (Go)
```bash
# From the root directory
go mod tidy
go run server/cmd/main.go
```
*Backend runs on `http://localhost:8080`*

### 3. 🎨 Start the Frontend (React)
```bash
cd Frontend/my-app
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🧪 Simulation Flow
1. **LOAD**: Server reads `service.json`.
2. **MONITOR**: Backend simulates random health fluctuations.
3. **TRIGGER**: If health < 0.7, failure propagation starts.
4. **ANALYZE**: DFS identifies downstream impacts.
5. **AI REPORT**: Gemini generates a detailed RCA.
6. **STREAM**: Results are sent via SSE to the React Dashboard.

---

## 🛡️ License
Built for the **Domino Effect Challenge**. 
