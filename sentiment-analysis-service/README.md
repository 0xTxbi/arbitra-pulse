# Sentiment Analysis Microservice

This microservice provides real-time sentiment insights for specific stocks.
Leveraging Natural Language Processing (NLP), it analyzes news articles related
to a stock and integrates data from the Stock Info microservice.

## Features

- **NLP-Driven Analysis:** Utilizes Natural Language Processing for
  near-accurate sentiment assessments.
- **Data Integration:** Fetches real-time stock information from the Stock Info
  service and retrieves news articles from the News service for sentiment
  analysis.
- **Rich API Responses:** Returns sentiment details, including sentiment, and
  confidence.

## Getting Started

1. **Clone the Repository:**

      ```bash
      git clone <repository-url>
      ```

2. **Install Dependencies:**

      ```bash
      yarn install
      ```

3. **Run the Microservice:**
      ```bash
      yarn start
      ```

## API Endpoints

- **Endpoint: `/sentiment/:stockSymbol`**
     - **Method:** GET
     - **Response:**
          - Sentiment details: sentiment, confidence.

## Testing

1. Spin up the Sentiment Analysis service.
2. Ensure the stock info and news service are running
3. Make a GET request to `/sentiment/:stockSymbol`.
4. Explore sentiment analysis results.

## Integration

Ensure that the Sentiment Analysis service is integrated with the Stock Info and
News Data services for comprehensive functionality.
