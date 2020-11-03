# Cloud resume challeng
In order to get some practise to take the aws solution architect certification, I got inspired by the cloudresumechallenge:
https://cloudresumechallenge.dev/instructions/ 

Instead of the given instruction I extended the project and added it with:
 - CDK instead of SAM
 - Typescript lambda functions

# set up
You have to write the api adress to the html
if you redeploy the bucket id changes -> also needs to be added to the html file

# Credits
The base html resume and css is from the project: 
https://github.com/tnielsen2/cloud-resume-challenge/tree/master/website 

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
