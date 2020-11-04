# Cloud resume challenge
In order to get some practise to take the aws solution architect certification, I got inspired by the cloudresumechallenge:
https://cloudresumechallenge.dev/instructions/ 

Instead of the given instruction I changed the project a bit with
 - CDK instead of SAM
 - Typescript lambda functions instead of Python

# Set up
To set up this stack you have to manually add the URLs to your html file. You can do this with a redploy. Everytime you destroy/deploy the your stack, the URLs are lost. 
Possible Workaround: You can add a DNS via Route53 what would cost you 10€

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
