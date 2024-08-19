# Choose the base image for the container
FROM node:20-alpine

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000 to be used by Docker
EXPOSE 5000

# Command to start the server
CMD [ "npm", "start" ]