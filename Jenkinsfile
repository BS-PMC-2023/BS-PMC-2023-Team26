pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = 'bs-pmc-2023-team26'
        DOCKER_REGISTRY_URL = 'my-docker-registry.com'
    }
    stages {
        stage('Build and test') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'python manage.py test'
            }
        }
        stage('Build and push Docker image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${env.BUILD_ID}")
                    docker.withRegistry("${DOCKER_REGISTRY_URL}", 'my-registry-credentials') {
                        docker.image("${DOCKER_REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${env.BUILD_ID}").push()
                    }
                }
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