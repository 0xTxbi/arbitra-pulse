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
EXPOSE 3001

# Define environment variables
ENV NODE_ENV=production
ENV PORT=3001
ENV POL_FIN_API_URL=pol_api_url
ENV POL_FIN_API_KEY=pol_api_key
ENV TD_FIN_API_URL=td_api_key
ENV TD_FIN_API_KEY=td_api_key

# Command to run  application
CMD ["yarn", "start"]
