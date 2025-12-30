"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freefinanceApiRequest = void 0;
async function freefinanceApiRequest(method, endpoint, body = {}, qs = {}) {
    const credentials = await this.getCredentials('freefinanceApi');
    const baseUrl = credentials.baseUrl.replace(/\/$/, '');
    const clientId = credentials.clientId;
    const clientSecret = credentials.clientSecret;
    // 1. Get Issuer Info to find the token endpoint
    // We use the base API URL to get the auth issuer info
    const issuerOptions = {
        method: 'GET',
        url: `${baseUrl}/auth/issuer`,
        json: true,
    };
    const issuerInfo = await this.helpers.httpRequest(issuerOptions);
    const ssoBaseUrl = issuerInfo.url.replace(/\/$/, '');
    const tokenEndpoint = `${ssoBaseUrl}/protocol/openid-connect/token`;
    // 2. Get Access Token using Client Credentials flow
    const tokenOptions = {
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
    const tokenResponse = await this.helpers.httpRequest(tokenOptions);
    const accessToken = tokenResponse.access_token;
    // 3. Make the actual API request
    const options = {
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
exports.freefinanceApiRequest = freefinanceApiRequest;
