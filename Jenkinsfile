pipeline {
    agent any
    tools {nodejs "node"}
    environment {
    HEROKU_API_KEY = credentials('heroku-api-key');\
    heroku-email= credentials('heroku-email')
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
                    steps {
                        bat 'npm test --verbose'
                    }
                }
                stage('Deliver') {
                            steps {
                                bat './jenkins/scripts/deliver.bat'
                             
                            }
                        }
                         stage('Herku login') {
                              steps {
                                bat 'git push https://heroku:40002b15-46c5-458c-86d7-dcbacd86192b@git.heroku.com/bms-loan.git HEAD:master'
                              }
                        }
                                    //    stage('Push to Heroku registry') {
                                    //                 steps {
                                    //                bat 'git push https://git.heroku.com/bms-loan.git master'
       
                                    //             }
                                    //         }

    }
}