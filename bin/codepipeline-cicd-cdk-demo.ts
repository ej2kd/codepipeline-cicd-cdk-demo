#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CodepipelineCicdCdkDemoStack } from "../lib/codepipeline-cicd-cdk-demo-stack";

const app = new cdk.App();
new CodepipelineCicdCdkDemoStack(app, "CodepipelineCicdCdkDemoStack", {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  },
});

app.synth();
