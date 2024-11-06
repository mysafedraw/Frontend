pipeline {
    agent any

    environment {
        CI = 'false'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    dir('frontend') {  
                        sh 'docker build -t frontend-image .'  // Dockerfile을 통해 이미지 빌드
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo 'Deploying with Docker Compose...'
                    dir('frontend') {
                        sh 'docker-compose up -d'  // 빌드된 이미지를 실행만
                    }
                }
            }
        }

        stage('Cleaning up images') {
            steps {
                script {
                    echo 'Cleaning up images...'
                    sh 'docker image prune -f'
                }
            }
        }
    }
}