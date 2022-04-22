import { Construct } from "constructs";
// import { Container, Image, DockerProvider } from "@cdktf/provider-docker";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider, ec2 } from "@cdktf/provider-aws";

class MyStack extends TerraformStack {
	constructor(scope: Construct, id: string) {
		super(scope, id);

		new AwsProvider(this, "AWS", {
			region: "us-west-1",
      profile: "shane"
		});

		const instance = new ec2.Instance(this, "compute", {
			ami: "ami-01456a894f71116f2",
			instanceType: "t2.micro",
      tags: {
        Name: "shane-cdktf-demo"
      }
		});

		new TerraformOutput(this, "public_ip", {
			value: instance.publicIp,
		});
	}
}

const app = new App();
new MyStack(app, "aws_instance");

// new RemoteBackend(stack, {
// 	hostname: "app.terraform.io",
// 	organization: "<YOUR_ORG>",
// 	workspaces: {
// 		name: "learn-cdktf",
// 	},
// });

app.synth();

// class MyStack extends TerraformStack {
// 	constructor(scope: Construct, name: string) {
// 		super(scope, name);

// 		new DockerProvider(this, "default", {});

// 		const dockerImage = new Image(this, "nginxImage", {
// 			name: "nginx:latest",
// 			keepLocally: false,
// 		});

// 		new Container(this, "nginxContainer", {
// 			image: dockerImage.latest,
// 			name: "tutorial",
// 			ports: [
// 				{
// 					internal: 80,
// 					external: 8000,
// 				},
// 			],
// 		});
// 	}
// }

// const app = new App();
// new MyStack(app, "typescript-docker");
// app.synth();
