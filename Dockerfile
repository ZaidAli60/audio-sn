# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build your React app
RUN npm run build

# Stage 2: Serve the app using a lightweight Node.js server
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only the build files from the previous stage
COPY --from=build /app/build ./build

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]