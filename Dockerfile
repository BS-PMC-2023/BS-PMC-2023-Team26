# Set the base image
FROM node:14.16.0-alpine as build

# Set the working directory for the React app
WORKDIR /ATMMAP/frontend

# Copy the package.json and package-lock.json files to the working directory
COPY frontend/package*.json ./

# Install the dependencies for the React app
RUN npm install

# Copy the rest of the React app files to the working directory
COPY frontend/ .

# Build the React app
RUN npm run build

# Set the base image for the Django app
FROM python:3.9.2-alpine3.13

# Set the working directory for the Django app
WORKDIR /ATMMAP

# Copy the requirements.txt file to the working directory
COPY backend/requirements.txt .

# Install the dependencies for the Django app
RUN pip install -r requirements.txt

# Copy the rest of the Django app files to the working directory
COPY backend/ .

# Copy the built React app to the Django app's static files directory
COPY --from=build /app/frontend/build /app/backend/static

# Expose the port for the Django app
EXPOSE 8000

# Start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
