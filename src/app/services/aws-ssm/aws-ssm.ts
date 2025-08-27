import {Injectable} from '@angular/core';
import {GetParameterCommand, SSMClient} from '@aws-sdk/client-ssm';

@Injectable({
  providedIn: 'root'
})
export class AwsSsm {

  public async configureSSm() {
    const client = new SSMClient({region: "eu-central-1",});
    const param = await client.send(
      new GetParameterCommand({Name: "/incident-reporting/baseUrl", WithDecryption: true}),
    );
    console.log(param.Parameter?.Value);
  }
}
