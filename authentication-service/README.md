# Authentication Microservice for Stock Sentiment Analysis API

This microservice handles user authentication and a watchlist feature, allowing
users to manage their tracked stock symbols effortlessly.

## Features

- **User Registration**: Sign up and create a new account with a unique
  username, email, and password.
- **User Login**: Authenticate using your username or email and password.
  Receive a JWT token upon successful login.
- **Profile Update**: Update your profile information, including email and
  username.
- **Watchlist Management**: Track your favorite stock symbols using the
  watchlist feature.

## Endpoints

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

## How to Use

1. **Clone the Repository**

      ```bash
      git clone <repository-url>
      ```

2. **Install Dependencies**

      ```bash
      cd authentication-service
      yarn install
      ```

3. **Run the Microservice**

      ```bash
      yarn start
      ```

4. **Explore Endpoints**
      - Use tools like Postman to test the various endpoints.
      - Ensure proper authentication when interacting with protected routes.

## Configuration

- Update the database configurations in `data-source.ts` to match your
  environment.
