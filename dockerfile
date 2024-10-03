FROM node:20.13.1-alpine

# Set the working directory inside the container
WORKDIR /usr/src/infoCluster

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the other project files
COPY . .

# Expose the port that Vite uses
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev"]