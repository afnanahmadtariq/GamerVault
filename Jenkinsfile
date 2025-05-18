pipeline {
  agent any

  environment {
    PROJECT_NAME = 'gamervault-part2'
  }

  stages {
    stage('Clone Repository') {
      steps {
        dir('part2') {
          git branch: 'main', url: 'https://github.com/afnanahmadtariq/GamerVault.git'
        }
      }
    }
    
    stage('Build and Deploy') {
      steps {
        script {
          dir('part2') {  // Ensure we're in the correct directory
            try {
              // Force recreation of containers to avoid the ContainerConfig error
              sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml down -v --remove-orphans || true'
              sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml build --no-cache'
              sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml up -d --force-recreate'
            } catch (Exception e) {
              echo "Error during build and deploy: ${e.message}"
              currentBuild.result = 'FAILURE'
              error "Failed to build and deploy: ${e.message}"
            }
          }
        }
      }
    }

  }
}
