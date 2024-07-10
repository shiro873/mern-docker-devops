pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Dockerize') {
            steps {
                sh 'docker build -t node-todo-app .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                sh 'docker tag node-todo-app:latest ridwanshuvro/node-todo-app:latest'
                sh 'docker push ridwanshuvro/ontik/node-todo-app:latest'
            }
        }
        stage('Deploy to Docker') {
            steps {
                sh 'docker rm -f node-todo-app || true'
                sh 'docker run -d -p 3000:3000 --name node-todo-app ridwanshuvro/node-todo-app:latest'
            }
        }
    }
}