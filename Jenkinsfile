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
          // dir('part2') {  // Ensure we're in the correct directory
            sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml down -v --remove-orphans || true'
            sh 'docker system prune -af || true'
            sh 'docker volume prune -f || true'
            sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml up -d --build'
          // }
        }
      }
    }

  }
}
