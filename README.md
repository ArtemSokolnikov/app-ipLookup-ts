# Application
It is an IP Lookup application that allows users to view their internal and public IP addresses, as well as resolve domain names to IP addresses.

## Features
- Display of internal and public IP addresses
- Resolution of domain names to IP addresses
- User-friendly interface

## Technologies Used
### Frontend
- TypeScript + React
- CSS, MUI

### Backend
- Server: Node.js
- Framework: Express

## Environment Configuration
### Running the Application
Start the docker-compose
    ```bash
    docker-compose up --build
    ```
A proxy is used here, and If you want to run the application without using Docker Compose,
all you need to do is change the proxy script to http://localhost:5000 in './client/package.json'
## Usage
1. Open your browser and navigate to http://localhost:3000.
2. Start checking your IP!
