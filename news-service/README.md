# News Service

This microservice fetches stock-related news from a third-party API. It provides
an endpoint to retrieve news articles.

## Features

- **Retrieve News by Stock Symbol:**
     - **Endpoint:** `/news/:stockSymbol`
     - Retrieve relevant news articles for a specific stock symbol.

## Getting Started

1. **Clone the Repository:**

      ```bash
      git clone <repository-url>
      cd news-service
      ```

2. **Install Dependencies:**

      ```bash
      yarn install
      ```

3. **Configure Third-Party API:**

      - Update the third-party API details in `NewsController.ts`.

4. **Run the Application:**

      ```bash
      yarn start
      ```

5. **API Endpoints:**
      - Explore the available endpoints at `http://localhost:3000/news`:
