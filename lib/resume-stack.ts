import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as path from 'path';

export class ResumeStack extends cdk.Stack {

  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  // TODO : https://medium.com/@robbcobb/make-a-resume-website-from-scratch-991845147ec 
  // https://github.com/tbaltrushaitis/cv 
   const resumeBucket= new s3.Bucket(this, "my-resume-website-bucket-1251874", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,        
      websiteIndexDocument: "resume.html",
     
   });

   new s3Deployment.BucketDeployment(this, 'AddResumeHTMLToBucket',{
    sources: [s3Deployment.Source.asset('./lib/html')],
    destinationBucket: resumeBucket,
    retainOnDelete: false,
    //destinationKeyPrefix: 'web/static',
    prune:false,
   });
   
   new s3Deployment.BucketDeployment(this, 'AddResumeCSSToBucket',{
    sources: [s3Deployment.Source.asset('./lib/css')],
    destinationBucket: resumeBucket,
    retainOnDelete: false,
    destinationKeyPrefix: 'web/css',
    prune:false,
   });

   //Defines the URL
   this.urlOutput= new cdk.CfnOutput(this, 'ResumeUrl', {
    value: resumeBucket.urlForObject('resume.html'),
  });
  
  
   

 
  }
}
