# Sensor Processing Platform

A full-stack web application for ingesting, analysing and visualising sensor data. The backend exposes REST APIs secured with JWT tokens and the frontend offers an interactive dashboard for monitoring and alerting.

## Features
- Authentication and authorisation using JSON Web Tokens
- Device management and list of available sensors
- Alert thresholds stored in Redis with email notifications
- Map based view of sensor locations using Leaflet
- Dashboard panels displaying historical sensor measurements

## Technology Stack
### Backend
- Java 21 with Spring Boot 3
- PostgreSQL/TimescaleDB for persistent storage
- Redis for caching and threshold management
- Gradle build system

### Frontend
- Angular 17
- Bootstrap and NG Bootstrap for UI components
- Leaflet for map integration

## Project Structure
```
.
├── Backend/   # Spring Boot API
└── Frontend/  # Angular client
```

## Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL and Redis instances (default configuration uses localhost)

## Running the Application
### Backend
```bash
cd Backend
./gradlew bootRun
```
The application will start on `http://localhost:9090`.

### Frontend
```bash
cd Frontend
npm install
npm start
```
Open `http://localhost:4200` in your browser to access the dashboard.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Distributed under the MIT License. See `LICENSE` for more information.
