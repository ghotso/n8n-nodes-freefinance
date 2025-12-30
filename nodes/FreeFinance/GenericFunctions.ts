import {
    IDataObject,
    IExecuteFunctions,
    IHttpRequestMethods,
    IHttpRequestOptions,
    ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function freefinanceApiRequest(
    this: IExecuteFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject = {},
    qs: IDataObject = {},
) {
    const credentials = await this.getCredentials('freefinanceApi');
    const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
    const clientId = credentials.clientId as string;
    const clientSecret = credentials.clientSecret as string;

    // 1. Get Issuer Info to find the token endpoint
    // We use the base API URL to get the auth issuer info
    const issuerOptions: IHttpRequestOptions = {
        method: 'GET',
        url: `${baseUrl}/auth/issuer`,
        json: true,
    };
    const issuerInfo = await this.helpers.httpRequest(issuerOptions) as IDataObject;
    const ssoBaseUrl = (issuerInfo.url as string).replace(/\/$/, '');
    const tokenEndpoint = `${ssoBaseUrl}/protocol/openid-connect/token`;

    // 2. Get Access Token using Client Credentials flow
    const tokenOptions: IHttpRequestOptions = {
        method: 'POST',
        url: tokenEndpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        },
    };

    const tokenResponse = await this.helpers.httpRequest(tokenOptions) as IDataObject;
    const accessToken = tokenResponse.access_token as string;

    // 3. Make the actual API request
    const options: IHttpRequestOptions = {
        method,
        url: `${baseUrl}${endpoint}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        qs,
        body,
        json: true,
    };

    return await this.helpers.httpRequest(options);
}
