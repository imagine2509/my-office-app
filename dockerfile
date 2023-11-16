FROM node:20.6.0

# Create app directory
WORKDIR /app

# Copy app source code to work directory
COPY . .

# Install app dependencies
RUN npm install

# Expose port 3044
EXPOSE 5173

# Run app
CMD ["npm", "run", "dev"]