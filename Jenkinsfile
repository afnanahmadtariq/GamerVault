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

    stage('Clean Docker') {
      steps {
        script {
          sh '''
            echo "Cleaning up Docker containers, volumes, images..."
            docker-compose down -v --remove-orphans || true
            docker system prune -af || true
            docker volume prune -f || true
          '''
        }
      }
    }
    
    stage('Build and Deploy') {
      steps {
        sh 'docker-compose -p $PROJECT_NAME -f docker-compose.yml up -d --build'
      }
    }

    stage('Cleanup Docker (Post-Deploy)') {
      steps {
        script {
          sh '''
            echo "Cleaning up Docker after deployment..."
            docker-compose down -v --remove-orphans || true
            docker system prune -af || true
            docker volume prune -f || true
          '''
        }
      }
    }
  }
}
