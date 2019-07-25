#!/usr/bin/env groovy
node  {
    def scmVars

    // environment {
    // PATH = "C:\\Program Files\\Git\\usr\\bin;C:\\Program Files\\Git\\bin;${env.PATH}"}
    environment {
        PATH = "C:\\Program Files\\Git\\usr\\bin;C:\\Program Files\\Git\\bin;${env.PATH}"
    }

     stage('build') {
withSonarQubeEnv('SonarQube') {
      // Use Maven Tool
    //   env.PATH="${tool 'M3'}/bin:${env.PATH}"
      scmVars = checkout scm

      // Run Build
     sh 'npm install'}
    }

    stage('Test'){
        withSonarQubeEnv('SonarQube') {
        sh 'npm run test'}
    }

    stage('Deploy') {
        def environment = "Prod"
      def description = "Deploying my branch"
      def ref = scmVars.GIT_COMMIT
      def owner = "yashyashwanth"
      def repo = "react-redux"
      def deployURL = "https://api.github.com/repos/${owner}/${repo}/deployments"
      def deployBody = '{"ref": "' + ref +'","environment": "' + environment  +'","description": "' + description + '"}'

      // Create new Deployment using the GitHub Deployment API
      def response = httpRequest authentication: '551532b7-7e5b-4a67-bc0c-c188ff92b7df', httpMode: 'POST', requestBody: deployBody, responseHandle: 'STRING', url: deployURL, validResponseCodes: '200:404'
      if(response.status != 201) {
          error("Deployment API Create Failed: " + response.status)
      }

      // Get the ID of the GitHub Deployment just created
      def responseJson = readJSON text: response.content
      def id = responseJson.id
      if(id == "") {
          error("Could not extract id from Deployment response")
      }

      // Execute Deployment
      def deployStatus = sh returnStatus: true, script: 'echo deploy'

      // Record new Deployment Status based on output
      def result = (deployStatus) ? 'failure' : 'success'
      def deployStatusBody = '{"state": "' + result + '","target_url": "http://github.com/deploymentlogs"}'
      def deployStatusURL = "https://api.github.com/repos/${owner}/${repo}/deployments/${id}/statuses"
      def deployStatusResponse = httpRequest authentication: '551532b7-7e5b-4a67-bc0c-c188ff92b7df', httpMode: 'POST', requestBody: deployStatusBody , responseHandle: 'STRING', url: deployStatusURL
      if(deployStatusResponse.status != 201) {
        error("Deployment Status API Update Failed: " + deployStatusResponse.status)
      }
    }

}
