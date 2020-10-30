#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ResumeStack } from '../lib/resume-stack';

const app = new cdk.App();
new ResumeStack(app, 'ResumeStack');
