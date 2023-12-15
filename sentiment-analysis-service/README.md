# Sentiment Analysis Microservice API

This microservice is an integral part of the Stock Sentiment Analysis API,
specializing in sentiment analysis for specific stocks. It seamlessly integrates
with the Authentication, Stock Info, and News microservices.

**Testing Endpoint**: You can test the API using the following endpoint:

- [Sentiment Analysis Microservice API](https://arbitra-pulse-sentiment-analysis.onrender.com)

## Features

- **Real-time Sentiment Analysis**: Utilizes Natural Language Processing (NLP)
  for accurate sentiment assessment.
- **Data Integration**: Fetches real-time stock information from the Stock Info
  service and retrieves news articles from the News service for sentiment
  analysis.

## Endpoints

1. **Analyze Sentiment**

      - `GET /sentiment/:stockSymbol`
      - **Response:**
           - Sentiment details: sentiment, confidence, and stock symbol.

## How to Use

1. **Clone the Repository**

      ```bash
      git clone <repository-url>
      ```

2. **Install Dependencies**

      ```bash
      cd sentiment-analysis-service
      yarn install
      ```

3. **Run the Microservice Locally**

      ```bash
      yarn start
      ```

4. **Explore Endpoint Locally**
      - Use tools like Postman and Insomnia to test the
        `/sentiment/:stockSymbol` endpoint.
      - Ensure proper data integration with the Stock Info and News services.

## Deployment to Cloud Service

1. **Build Docker Image**

      ```bash
      docker build -t sentiment-analysis-service .
      ```

2. **Tag Docker Image (Optional, for pushing to a registry)**

      ```bash
      docker tag sentiment-analysis-service:latest your-registry-username/sentiment-analysis-service:latest
      ```

      Replace `your-registry-username` with your actual registry username.

3. **Run Docker Container Locally**

      ```bash
      docker run -p 3000:3000 \
        -e AUTH_SERVICE=auth_service_value \
        -e STOCK_INFO_SERVICE=stock_info_service_value \
        -e NEWS_SERVICE=news_service_value \
        -d sentiment-analysis-service
      ```

4. **Deploy to Cloud Service**

      - Deploy the Docker image to your cloud service. Follow the
        platform-specific instructions.
      - Set environment variables in your cloud service and other settings.

Environment Variables:

- `AUTH_SERVICE`: URL of the running auth service.
- `STOCK_INFO_SERVICE`: URL of the running stock info service.
- `NEWS_SERVICE`: URL of the running news service.
