# Stock Info Microservice for Stock Sentiment Analysis API

This microservice is an integral part of the Stock Sentiment Analysis API,
focusing on providing detailed information about stocks, enabling stock
searches, and managing a user's watchlist.

**Testing Endpoint**: You can test the API using the following endpoint:

- [Stock Info Microservice API](https://arbitra-pulse-stock-info.onrender.com)

## Features

- **Retrieve Stock Information**: Get detailed information about a specific
  stock using its symbol.
- **Search for Stocks**: Search for stocks based on keywords and receive a list
  of filtered stock objects.
- **Get Watchlist**: Retrieve the user's watchlist, including tracked stock
  symbols.
- **Add to Watchlist**: Add a stock symbol to the user's watchlist.
- **Remove from Watchlist**: Remove a stock symbol from the user's watchlist.
- **Clear Watchlist**: Remove all stocks from the user's watchlist.

## Endpoints

1. **Retrieve Stock Information**

      - `GET /stock/:stockSymbol`

2. **Search for Stocks**

      - `GET /search/:query`

3. **Get Watchlist**

      - `GET /watchlist`

4. **Add to Watchlist**

      - `POST /watchlist/add/:symbol`

5. **Remove from Watchlist**

      - `DELETE /watchlist/remove/:symbol`

6. **Clear Watchlist**

      - `DELETE /watchlist/clear`

## How to Use

1. **Clone the Repository**

      ```bash
      git clone <repository-url>
      ```

2. **Install Dependencies**

      ```bash
      cd stock-info-service
      yarn install
      ```

3. **Run the Microservice Locally**

      ```bash
      yarn start
      ```

4. **Explore Endpoints Locally**
      - Use tools like Postman or Insomnia to test the various endpoints.
      - Ensure proper authentication when interacting with protected routes.

## Deployment to Cloud Service

1. **Build Docker Image**

      ```bash
      docker build -t stock-info-microservice .
      ```

2. **Tag Docker Image (Optional, for pushing to a registry)**

      ```bash
      docker tag stock-info-microservice:latest your-registry-username/stock-info-microservice:latest
      ```

      Replace `your-registry-username` with your actual registry username.

3. **Run Docker Container Locally**

      ```bash
      docker run -p 3000:3000 \
        -e POL_FIN_API_URL=your_polygon_financial_api_url \
        -e POL_FIN_API_KEY=your_polygon_financial_api_key \
        -e TD_FIN_API_URL=your_twelve_data_api_url \
        -e TD_FIN_API_KEY=your_twelve_data_api_key \
        -d stock-info-service
      ```

      Ensure to replace the API and financial credentials with your actual
      configurations.

4. **Deploy to Cloud Service**

      - Deploy the Docker image to your cloud service. Follow the
        platform-specific instructions.
      - Set environment variables in your cloud service for API and financial
        configurations.

## Configuration

- Update the API and financial configurations in your `.env` file to match your
  environment.

**Note:** Ensure proper security measures when handling sensitive information,
such as API keys and credentials.
