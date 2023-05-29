pipeline {
    agent any

    stages {
        stage('Setup environment') {
            steps {
                sh 'pip install --upgrade pip'
                sh 'pip install -r requirements.txt'
            }
        }
        
        stage('Run tests') {
            steps {
                sh 'python manage.py test'
            }
        }
    }
}
