# Weather API

A simple Express.js API to fetch and cache weather data using Redis (Upstash) and Visual Crossing Weather API.

## Features

- Fetches current weather and forecast for a given location.
- Caches responses in Upstash Redis for faster subsequent requests.
- Simple RESTful endpoint structure.

## Project Structure

```
.
├── index.js
├── package.json
├── .env.example
├── src/
│   ├── controller/
│   │   └── weather.js
│   ├── db/
│   │   └── redis.db.js
│   └── routes/
│       └── routes.js
└── utils/
    ├── apierr.js
    ├── apiresp.js
    ├── asynchandler.js
    └── weatherResponse.class.js
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Upstash Redis account
- Visual Crossing Weather API key

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Debanjan2007/roadmap_projects.git
    cd weather-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Copy `.env.example` to `.env` and fill in your credentials:

    ```sh
    cp .env.example .env
    ```

    Edit `.env` and set:
    - `API_KEY` (Visual Crossing)
    - `UPSTASH_URL` and `UPSTASH_TOKEN` (Upstash Redis)
    - `PORT` (default: 6500)
    - `REDIS_EXPIRY` (default: 1800)

### Running the Server

Start the server in development mode:

```sh
npm run dev
```

The API will be available at `http://localhost:6500/weather/v1/api/:LOCATION`

## API Usage

### Get Weather Details

**Endpoint:**
```
POST /weather/v1/api/:LOCATION
```

**Parameters:**
- `LOCATION` (string): Name of the location (e.g., "London")

**Response:**
- 200: Weather data (from cache or API)
- 404: If location is missing
- 500: On server or API error

**Example:**

```sh
curl -X POST http://localhost:6500/weather/v1/api/London
```

## Environment Variables

See [.env.example](.env.example) for required variables.

## License

ISC

---

**Author:** Debanjan Das