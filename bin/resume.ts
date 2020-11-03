#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ResumeStack } from '../lib/resume-stack';
const app = new cdk.App();
new ResumeStack(app, 'ResumeStack',{
    env: {
        account: '834816610298',
        region: 'us-east-1',
      }
});
