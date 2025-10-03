pipeline {
  agent any
  tools { nodejs 'node20' } 
  options {
    timestamps()
    ansiColor('xterm')
  }
  triggers { cron('H */2 * * *') }
  environment {
    
    HEADLESS = 'true'
    
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install deps') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run UI tests (Chrome)') {
      steps {
        sh 'npm run test:chrome'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: '**/wdio-*.log, **/logs/**', allowEmptyArchive: true
    }
    failure {
      mail to: 'you@example.com',
           subject: "[Jenkins] UI tests failed on ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Check console: ${env.BUILD_URL}"
    }
  }
}
