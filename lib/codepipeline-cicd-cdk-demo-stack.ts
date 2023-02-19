import * as cdk from "aws-cdk-lib";
import {
  CodePipelineSource,
  ShellStep,
  CodePipeline,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CodepipelineCicdCdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "ej2kd/codepipeline-cicd-cdk-demo",
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
