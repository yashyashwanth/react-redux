#!/usr/bin/env groovy
pipeline {
    agent any

    stages {
        stage('Build') {
              steps {
                echo 'Building..'
                // sh 'npm install' need 
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh "npm run test"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh "npm run build"
            }
        }
    }
}
