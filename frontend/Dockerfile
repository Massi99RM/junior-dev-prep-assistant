FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests first to leverage Docker's layer caching
COPY package.json package-lock.json ./

# Install dependencies using lockfile for reproducible builds
RUN npm ci
COPY . .

ARG VITE_API_URL
RUN npm run build

FROM nginx:alpine

# Copy only the compiled static build output from the builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# The container listens on port 80
EXPOSE 80