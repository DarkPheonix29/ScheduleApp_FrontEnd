# Step 1: Build the React app using Node.js
FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or npm-shrinkwrap.json) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the production version of the app using Vite
RUN npm run build

# Expose the port Nginx will use
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
