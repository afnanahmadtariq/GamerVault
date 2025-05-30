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

ARG MONGODB_URI
ARG JWT_SECRET

ENV MONGODB_URI=$MONGODB_URI
ENV JWT_SECRET=$JWT_SECRET

# Build the Next.js app
RUN npm run build || { echo "Build failed"; exit 1; }

# Expose the app port
EXPOSE 3000

# RUN echo '#!/bin/sh\necho "Waiting for MongoDB to be ready..."\nsleep 5\necho "Running seed script..."\nnpm run seed\necho "Starting application..."\nexec npm start' > /start.sh && chmod +x /start.sh

# CMD ["/start.sh"]

# Start the app
CMD ["npm", "start"]
