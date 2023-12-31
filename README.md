# Arbitra Pulse: Stock Sentiment Analysis API

Arbitra Pulse is a robust Stock Sentiment Analysis API comprising multiple
microservices tailored to provide real-time stock information, sentiment
analysis, and personalized user experiences. The API's architecture involves the
following microservices:

- **Authentication Microservice**
- **Stock Info Microservice**
- **News Service**
- **Sentiment Analysis Microservice**

![Arbitra Pulse Architecture](assets/arbitra-pulse-architecture.jpg)

## Table of Contents

- [Arbitra Pulse: Stock Sentiment Analysis API](#arbitra-pulse-stock-sentiment-analysis-api)
     - [Table of Contents](#table-of-contents)
     - [Authentication Microservice](#authentication-microservice)
          - [Overview](#overview)
          - [Endpoints](#endpoints)
          - [Explore](#explore)
     - [Stock Info Microservice](#stock-info-microservice)
          - [Overview](#overview-1)
          - [Endpoints](#endpoints-1)
          - [Explore](#explore-1)
     - [News Service](#news-service)
          - [Overview](#overview-2)
          - [Endpoint](#endpoint)
          - [Explore](#explore-2)
     - [Sentiment Analysis Microservice](#sentiment-analysis-microservice)
          - [Overview](#overview-3)
          - [Endpoint](#endpoint-1)
          - [Explore](#explore-3)
     - [Interaction Overview](#interaction-overview)
          - [How Microservices Interact](#how-microservices-interact)
          - [Seamless User Experience](#seamless-user-experience)
     - [Technology Stack](#technology-stack)

---

## Authentication Microservice

### Overview

The Authentication Microservice manages user authentication, registration, and
watchlist functionality. It offers endpoints for user registration, login,
profile updates, and watchlist manipulation.

### Endpoints

1. **Register User**

      - `POST /register`

2. **User Login**

      - `POST /login`

3. **Update Profile**

      - `PUT /profile`

4. **Get User's Watchlist**

      - `GET /watchlist`

5. **Add to Watchlist**

      - `POST /watchlist/add/:symbol`

6. **Remove from Watchlist**
      - `DELETE /watchlist/remove/:symbol`

### Explore

[Explore Authentication Microservice](https://arbitra-pulse-auth.onrender.com)

---

## Stock Info Microservice

### Overview

The Stock Info Microservice offers detailed stock information, stock searches,
and watchlist management. It fetches real-time stock data from external
financial APIs.

### Endpoints

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

### Explore

[Explore Stock Info Microservice](https://arbitra-pulse-stock-info.onrender.com)

---

## News Service

### Overview

The News Service fetches stock-related news articles for relevant sentiment
analysis. It provides an endpoint to retrieve news articles for a specific stock
symbol.

### Endpoint

- `GET /news/:stockSymbol`

### Explore

[Explore News Service](https://arbitra-pulse-news.onrender.com)

---

## Sentiment Analysis Microservice

### Overview

The Sentiment Analysis Microservice specializes in real-time sentiment analysis
for specific stocks. It seamlessly integrates with the Authentication, Stock
Info, and News microservices.

### Endpoint

1. **Analyze Sentiment**
      - `GET /sentiment/:stockSymbol`

### Explore

[Explore Sentiment Analysis Microservice](https://arbitra-pulse-sentiment-analysis.onrender.com)

---

## Interaction Overview

The microservices in Arbitra Pulse collaboratively work to offer a seamless and
integrated user experience. Here's an overview of their interactions:

### How Microservices Interact

1. **User Registration and Authentication:**

      - The **Authentication Microservice** is responsible for managing user
        registration and authentication.
      - Upon successful authentication, users receive a JWT token, granting
        access to protected endpoints in other microservices.

2. **Stock Information and Watchlist Management:**

      - The **Stock Info Microservice** provides real-time stock information,
        including detailed data and search functionality.
      - Watchlist-related operations, such as adding, removing, and retrieving
        symbols, are handled by the **Authentication Microservice**.

3. **News Article Retrieval:**

      - The **News Service** fetches stock-related news articles from external
        sources.
      - The **Sentiment Analysis Microservice** utilizes these articles for
        sentiment analysis.

4. **Sentiment Analysis Integration:**

      - The **Sentiment Analysis Microservice** performs real-time sentiment
        analysis on specific stocks.
      - It seamlessly integrates with the **Authentication Microservice** to
        ensure authenticated access to its sentiment analysis endpoint.

### Seamless User Experience

The interplay between these microservices ensures a cohesive and responsive user
experience. Users can seamlessly register, authenticate, access real-time stock
information, manage their watchlist, and receive sentiment analysis—all within
the Arbitra Pulse API ecosystem. Each microservice plays a vital role,
contributing to the comprehensive functionality of the entire system.

## Technology Stack

The Arbitra Pulse API leverages the following technology stack:

- **Node.js**: Runtime environment for server-side applications.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **TypeScript**: Statically typed superset of JavaScript for enhanced code
  quality.
- **PostgreSQL**: Relational database system for storing user data and
  application information.
- **TypeORM**: Object-Relational Mapping (ORM) library for TypeScript and
  JavaScript.
- **Docker**: Containerization for seamless deployment across environments.
- **Yarn Workspaces**: Manages the monorepo structure and dependencies.

Feel free to explore each microservice's dedicated README for more detailed
information on how to use them and deploy them locally or in a cloud
environment.

**Note:** Ensure proper security measures when handling sensitive information,
such as API keys, credentials, and database configurations.
