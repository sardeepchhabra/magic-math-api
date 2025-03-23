# Magic Math REST API (Node.js)

A simple Express.js application that calculates Magic Math values and exposes them via a REST API.

## Magic Math Definition

Magic Math is defined as:
- magic_math(0) = 0
- magic_math(1) = 1
- magic_math(N) = magic_math(N−1) + magic_math(N−2) + N

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm (Node package manager)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/magic-math-api.git
cd magic-math-api
```

2. Install dependencies:
```
npm install
```

### Running the Application

Start the Express server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

The server will start on http://localhost:5000

### API Usage

Make a GET request to `/<n>` where `n` is a non-negative integer:

```
curl http://127.0.0.1:5000/10
```

Response:
```json
{
  "n": 10,
  "result": 143
}
```

## Implementation Details

- The implementation uses a Map for memoization to optimize performance for repeated calculations
- Input validation ensures only non-negative integers are processed
- The Express application is configured to listen on all interfaces (0.0.0.0) on port 5000

## Running with Docker

A Dockerfile is included for containerized deployment:

1. Build the Docker image:
```
docker build -t magic-math-api .
```

2. Run the container:
```
docker run -p 5000:5000 magic-math-api
```

Access the API at http://localhost:5000