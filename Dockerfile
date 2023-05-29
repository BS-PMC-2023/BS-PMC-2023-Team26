# Set the base image for the Node.js app
FROM node:14.16.0-alpine as build

# Set the working directory for the Node.js app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ./ATMMAP/frontend/package*.json ./

# Install the dependencies for the Node.js app
RUN npm install

# Copy the rest of the Node.js app files to the working directory
COPY ./ATMMAP/frontend/ .

# Build the Node.js app
RUN npm run build

# Set the base image for the Django app
FROM python:3.9.2-alpine3.13

# Set the working directory for the Django app
WORKDIR /app

# Install system-level dependencies
RUN apk update && apk add --no-cache gcc musl-dev python3-dev libffi-dev openssl-dev cargo

# Copy the requirements.txt file to the working directory
COPY ./ATMMAP/requirements.txt .

# Install the dependencies for the Django app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the Django app files to the working directory
COPY ./ATMMAP/ .

# Copy the built Node.js app to the Django app's static files directory
COPY --from=build /app/static/frontend /app/ATMMAP/static

# Expose the port for the Django app
EXPOSE 8000

# Start the Django app
CMD ["python", "./ATMMAP/manage.py", "runserver", "0.0.0.0:8000"]
