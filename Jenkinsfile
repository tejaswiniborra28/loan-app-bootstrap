pipeline {
    agent any
    tools {nodejs "node"}
     environment {
            CI = 'true'
        }
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        // stage('Test') {
        //             steps {
        //                 bat './jenkins/scripts/test.bat'
        //             }
        //         }
                stage('Deliver') {
                            steps {
                                bat './jenkins/scripts/deliver.bat'
                                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                                bat './jenkins/scripts/kill.bat'
                            }
                        }

    }
}