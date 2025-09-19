pipeline {
  agent any

  tools {
    nodejs "NodeJS 18" // Cấu hình trong Jenkins → Manage Jenkins → Global Tool Configuration
  }

  environment {
    PLAYWRIGHT_BROWSERS_PATH = "0" // Cài trình duyệt vào node_modules để Jenkins dùng được
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

stage('Install Playwright Browsers') {
  steps {
    bat '''
      set PLAYWRIGHT_BROWSERS_PATH=0
      npx playwright install
    '''
  }
}


    stage('Run Regression Tests') {
      steps {
        sh 'npm run regression'
      }
    }

    stage('Publish HTML Report') {
      steps {
        sh 'npx playwright show-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
