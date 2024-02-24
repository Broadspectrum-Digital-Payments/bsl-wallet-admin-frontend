# Example of installing dependencies in the Dockerfile
FROM node:18

WORKDIR /app

  # Copy package.json and yarn.lock (or package-lock.json)
COPY package.json yarn.lock ./

  # Install dependencies
RUN yarn install --frozen-lockfile

  # Copy the rest of the app files
COPY . .

  # Build the app (if needed)
RUN yarn build

  # Start the app
CMD ["yarn", "start"]