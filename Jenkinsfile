pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/BS-PMC-2023/BS-PMC-2023-Team26'
            }
        }

        stage('Setup') {
            steps {
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate'
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Test') {
            steps {
                sh 'python manage.py test'
            }
        }
    }
}
