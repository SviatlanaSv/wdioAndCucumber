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
    stage('Node version') {
      steps { 
        bat 'node -v && npm -v'
      }
    }
    stage('Install deps') {
      steps {
        bat 'npm ci'
      }
    }
    stage('Run UI tests (Chrome)') {
      steps {
        bat 'npm run test:chrome'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: '**/wdio-*.log, **/logs/**', allowEmptyArchive: true
    }
    // failure { ... mail ... }  
  }
}
