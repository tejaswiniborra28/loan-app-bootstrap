pipeline {
    agent any
    tools {nodejs "node"}
    environment {
     TOMCATWEB ="C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps"

     }
    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
                    steps {
                        bat 'npm test --verbose'
                    }
                }
                //  stage('e2eTest') {
                //     steps {
                //         bat 'npx run test:e2e'
                //     }
                // }
                    stage('Build') {
                                steps {
                                    bat 'npm run compile'
                                
                                }
                            }
                            stage('Deploy to server') {
                            steps {
                                   deploy adapters: [tomcat9(credentialsId: 'tomcat', path: '', url: 'http://localhost:8090/')], contextPath: 'loan-application', onFailure: false, war: '**/*.war'
                                
                                }
                            }

                        //  stage('Heroku deployment') {
                        //       steps {
                        //         bat 'git push https://heroku:40002b15-46c5-458c-86d7-dcbacd86192b@git.heroku.com/bms-loan.git HEAD:master'
                        //       }
                        // }

    }
}