import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as path from 'path';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';

export class ResumeStack extends cdk.Stack {

  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  // TODO : https://medium.com/@robbcobb/make-a-resume-website-from-scratch-991845147ec 
  // https://github.com/tbaltrushaitis/cv 
  // https://github.com/tnielsen2/cloud-resume-challenge/tree/master/website 

  // Add dynamoDb table with api gateway
    const dynamoTable= new dynamodb.Table(this, "CounterTable", {
      partitionKey: {
        name: 'itemId',
        type: dynamodb.AttributeType.STRING,
      },
      tableName: 'CounterResumeTable',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT DESTORoy
    });

    // aws dynamodb put-item --table-name CounterResumeTable --item "{\"itemId\":{\"S\":\"abc-123\"},\"Name\":{\"S\":\"Fluffy\"},\"Color\":{\"S\":\"white\"}}" --profile Timoaccount --region us-east-1

    /*
    const api = new apigw.RestApi(this, 'CounterApi', {
      restApiName: 'Counter API for resume',
      description: 'An API GW for a dynamoDB to access the data',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
      
    });
    */
    

    const counterLambda = new lambda.Function(this, 'CounterResumeFunction', {
      functionName: 'CounterResumeFunction',
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'counter.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),

      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'itemId',
        
      },
    });

    const api = new apigw.LambdaRestApi(this, 'Counterapi',{
      handler: counterLambda,
      restApiName: 'Counter API ',
      proxy: false,
      description: 'An API GW for a dynamoDB to access the data',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
    })

    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html#working-with-models !!!
    // Current woraroun -> Delete the set GET methde and replace it with a new one without proxy

    dynamoTable.grantReadWriteData(counterLambda);

    //Disable mapping
    const items = api.root.addResource('items');
    const getAllIntegration = new apigw.LambdaIntegration(counterLambda);
    items.addMethod('GET', getAllIntegration);

    //Add Bucket with static website
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
    //destinationKeyPrefix: 'web/css',
    prune:false,
   });

   //Defines the URL
   this.urlOutput= new cdk.CfnOutput(this, 'ResumeUrl', {
    value: resumeBucket.urlForObject('resume.html'),
  });
  
  }
}

