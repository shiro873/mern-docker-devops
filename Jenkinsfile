pipeline {
    agent any
    tools {
        nodejs 'Node.js 22.4.1'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Dockerize') {
            steps {
                sh 'docker build -t test-app .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                    sh 'docker tag test-app:latest ridwanshuvro/ontik/test-app:latest'
                    sh 'docker push ridwanshuvro/ontik/test-app:latest'
                }
            }
        }
        stage('Deploy to Docker') {
            steps {
                sh 'docker rm -f test-app || true'
                sh 'docker run -d -p 3000:3000 --name test-app ridwanshuvro/ontik/test-app:latest'
            }
        }
    }
}