# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json to the working directory
COPY package.json ./

# Install dependencies using yarn
RUN yarn install --production

# Install nodemon, ts-node, and TypeScript globally
RUN yarn global add nodemon ts-node typescript

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3003

# Define environment variables
ENV NODE_ENV=production
ENV PORT=3003
ENV AUTH_SERVICE=url
ENV STOCK_INFO_SERVICE=url
ENV NEWS_SERVICE=url
ENV SENTIMENT_SERVICE=url

# Command to run  application
CMD ["yarn", "start"]
