pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = 'bs-pmc-2023-team26'
        DOCKER_REGISTRY_URL = 'my-docker-registry.com'
    }
    stages {
        
        stage('Build and test') {
            steps {
                sh 'cd ./ATMMAP/frontend'
                sh 'npm install'
                sh 'npm run dev'
                sh 'cd ls'
                sh 'python manage.py runserver'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }
}