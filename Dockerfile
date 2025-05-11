# Use official Node.js image
FROM node:24-alpine

# Set working directory
WORKDIR /gamervault-src

# Copy package.json and lock file
COPY gamervault-src/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY gamervault-src/ .

# Build the Next.js app
RUN next build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
