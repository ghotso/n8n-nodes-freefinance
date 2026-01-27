import {
    IDataObject,
    IExecuteFunctions,
    IHttpRequestMethods,
    IHttpRequestOptions,
    ILoadOptionsFunctions,
    IBinaryData,
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

export async function freefinanceUploadDocument(
    this: IExecuteFunctions,
    clientId: string,
    binaryData: IBinaryData,
    fileContent: Buffer,
    options: {
        fileName?: string;
        description?: string;
        skipOcr?: boolean;
    } = {},
) {
    const credentials = await this.getCredentials('freefinanceApi');
    const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
    const oauthClientId = credentials.clientId as string;
    const clientSecret = credentials.clientSecret as string;

    // 1. Get Issuer Info to find the token endpoint
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
            client_id: oauthClientId,
            client_secret: clientSecret,
        },
    };

    const tokenResponse = await this.helpers.httpRequest(tokenOptions) as IDataObject;
    const accessToken = tokenResponse.access_token as string;

    // 3. Prepare the document upload body (Base64 JSON endpoint)
    const fileName = options.fileName || binaryData.fileName || 'document';
    const contentType = binaryData.mimeType || 'application/octet-stream';
    const base64Content = fileContent.toString('base64');

    const uploadBody: IDataObject = {
        file_name: fileName,
        content_type: contentType,
        content: base64Content,
    };

    if (options.description) {
        uploadBody.description = options.description;
    }

    if (options.skipOcr !== undefined) {
        uploadBody.skip_ocr = options.skipOcr;
    }

    // 4. Upload the document using the JSON endpoint
    const uploadOptions: IHttpRequestOptions = {
        method: 'POST',
        url: `${baseUrl}/clients/${clientId}/doc/providers/DMS/staging/json`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: uploadBody,
        json: true,
    };

    return await this.helpers.httpRequest(uploadOptions);
}
