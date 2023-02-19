import * as cdk from "aws-cdk-lib";
import {
  CodePipelineSource,
  ShellStep,
  CodePipeline,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { ManualApprovalStep } from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./stage";

export class CodepipelineCicdCdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "ej2kd/codepipeline-cicd-cdk-demo",
          "main"
        ),
        installCommands: ["npm i -g npm@latest"],
        commands: ["npm -v", "npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const testingStage = pipeline.addStage(
      new MyPipelineAppStage(this, "test", {
        env: {
          account: process.env.AWS_ACCOUNT_ID,
          region: process.env.AWS_REGION,
        },
      })
    );

    testingStage.addPost(
      new ManualApprovalStep("Manual approval before production")
    );

    const prodStage = pipeline.addStage(
      new MyPipelineAppStage(this, "prod", {
        env: {
          account: process.env.AWS_ACCOUNT_ID,
          region: process.env.AWS_REGION,
        },
      })
    );
  }
}
