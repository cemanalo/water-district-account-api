import { SSMClient, GetParameterCommand, GetParameterCommandInput } from "@aws-sdk/client-ssm";

export class SecretClientService {
  async getValue(key: string): Promise<Record<string, string>> {
    if(process.env.ENV === 'local') {
      return this.getFromSSM(key)
    }

    return this.getFromLayer(key)
  }

  private async getFromLayer(key: string): Promise<Record<string, string>> {
    const url = `http://localhost:2773/systemsmanager/parameters/get/?name=${key}`;
    const result = await (await fetch(url, {
      headers: {
        'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN
      }
    })).json()

    const value = result.Parameter.Value


    return JSON.parse(value);
  }

  private async getFromSSM(key: string): Promise<Record<string, string>> {
    const client = new SSMClient();
    const input: GetParameterCommandInput = { 
      Name: key, 
      WithDecryption: false,
    };


    const command = new GetParameterCommand(input)
    const response = await client.send(command)
    const result = JSON.parse(response.Parameter?.Value || '{}')
    return result;
  }

  public mapToEnv(ssmValue: Record<string, string>, mapper: Record<string, string>): void {
    ssmValue && Object.entries(ssmValue).forEach(([key, value]) => {
      if(mapper[key]) {
        process.env[mapper[key]] = value;
      }
    })
  }
}
