# News Service

This microservice is part of the Stock Sentiment Analysis API and focuses on
fetching stock-related news. It provides an endpoint to retrieve news articles.

**Testing Endpoint**: You can test the API using the following endpoint:

- [Stock News Microservice API](https://arbitra-pulse-news.onrender.com)

## Features

- **Retrieve News by Stock Symbol:**
     - **Endpoint:** `/news/:stockSymbol`
     - Retrieve relevant news articles for a specific stock symbol.

### Getting Started

1. **Clone the Repository:**

      ```bash
      git clone <repository-url>
      cd news-service
      ```

2. **Install Dependencies:**

      ```bash
      yarn install
      ```

3. **Run the Application:**

      ```bash
      yarn start
      ```

## Dockerization

### Build Docker Image

```bash
docker build -t news-service .
```

### Run Docker Container

```bash
docker run -p 3000:3000 news-service
```

### Dependencies

This microservice makes use of the News Data Service API. Ensure that the News
Data Service API is accessible.

### Environment Variables

The following environment variables are required for the microservice to run:

- `ND_NEWS_API_URL`: URL of the News Data Service API.
- `ND_NEWS_API_KEY`: API key for accessing the News Data Service API.
