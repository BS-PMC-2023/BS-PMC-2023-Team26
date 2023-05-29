pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = 'bs-pmc-2023-team26'
    }
    stages {
        stage('Build Docker image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE_NAME} .'
            }
        }
        stage('Test Docker image') {
            steps {
                sh 'docker run --rm ${DOCKER_IMAGE_NAME}'
            }
        }
    }
}
