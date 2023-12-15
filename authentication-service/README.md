# Authentication Microservice for Stock Sentiment Analysis API

This microservice is part of the Stock Sentiment Analysis API and focuses on
user authentication, including a watchlist feature for tracking stock symbols.

**Testing Endpoint**: You can test the API using the following endpoint:

- [Authentication Microservice API](https://arbitra-pulse-auth.onrender.com/)

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

3. **Run the Microservice Locally**

      ```bash
      yarn start
      ```

4. **Explore Endpoints Locally**
      - Use tools like Postman to test the various endpoints.
      - Ensure proper authentication when interacting with protected routes.

## Deployment to Cloud Service

1. **Build Docker Image**

      ```bash
      docker build -t authentication-service .
      ```

2. **Tag Docker Image (Optional, for pushing to a registry)**

      ```bash
      docker tag authentication-service:latest your-registry-username/authentication-service:latest
      ```

      Replace `your-registry-username` with your actual registry username.

3. **Run Docker Container Locally**

      ```bash
      docker run -p 3000:3000 \
        -e DB_HOST=your_db_host \
        -e DB_PORT=your_db_port \
        -e DB_USERNAME=your_db_username \
        -e DB_PASSWORD=your_db_password \
        -e DB_DATABASE=your_db_name \
        -d authentication-service
      ```

      Ensure to replace the database variables with your actual PostgreSQL
      database configuration.

4. **Deploy to Cloud Service**

      - Deploy the Docker image to your cloud service. Follow the
        platform-specific instructions.
      - Set environment variables in your cloud service for database
        configuration and other settings.

5. **Monitor and Scale (Optional)**

      - Monitor your deployed application using the cloud service dashboard.
      - Scale your application as needed based on demand.

## Configuration

- Update the database configurations in `data-source.ts` to match your
  environment.

### PostgreSQL and TypeORM Configuration

- The microservice uses PostgreSQL as the database.
- TypeORM is used as the Object-Relational Mapping (ORM) tool.

Environment Variables:

- `DB_HOST`: Hostname or IP address of your PostgreSQL database server.
- `DB_PORT`: Port number on which your PostgreSQL server is running.
- `DB_USERNAME`: Username to connect to the PostgreSQL database.
- `DB_PASSWORD`: Password for the specified database user.
- `DB_DATABASE`: Name of the PostgreSQL database.

**Note:** Ensure proper security measures when handling sensitive information,
such as database credentials.
