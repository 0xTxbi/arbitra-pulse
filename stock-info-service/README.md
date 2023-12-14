# Stock Info Microservice

This microservice provides endpoints for retrieving detailed information about
stocks, searching for stocks based on keywords, and managing a user's watchlist.

### Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies:

```bash
yarn install
```

### Running the Microservice

```bash
yarn start
```

The microservice will be running at `http://localhost:3001`.

## API Endpoints

### 1. Retrieve Stock Information

```http
GET /stock/:stockSymbol
```

Retrieves detailed information about a specific stock identified by its symbol.

### 2. Search for Stocks

```http
GET /search/:query
```

Searches for stocks based on a keyword and returns a list of filtered stock
objects.

### 3. Get Watchlist

```http
GET /watchlist
```

Retrieves the user's watchlist.

### 4. Add to Watchlist

```http
POST /watchlist/add/:symbol
```

Adds a stock symbol to the user's watchlist.

### 5. Remove from Watchlist

```http
DELETE /watchlist/remove/:symbol
```

Removes a stock symbol from the user's watchlist.

### 6. Clear Watchlist

```http
DELETE /watchlist/clear
```

Clears all stocks from the user's watchlist.
