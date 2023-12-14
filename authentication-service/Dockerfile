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
EXPOSE 3000

# Define environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DB_HOST=db.example.com
ENV DB_PORT=5432
ENV DB_USER=username
ENV DB_PASSWORD=password
ENV DB_DATABASE=database_name

# Command to run  application
CMD ["yarn", "start"]
