# Use the official Node.js image as a base
FROM node:14

# Install PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app
CMD ["npm", "start"]
