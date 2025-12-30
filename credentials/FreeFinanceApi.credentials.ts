import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class FreeFinanceApi implements ICredentialType {
    name = 'freefinanceApi';
    displayName = 'FreeFinance API';
    documentationUrl = 'https://freefinance-dev.github.io/';
    properties: INodeProperties[] = [
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://api.freefinance.at/api/2.0',
            required: true,
            description: 'The base URL for the FreeFinance API (e.g., https://api.freefinance.at/api/2.0)',
        },
        {
            displayName: 'Client ID',
            name: 'clientId',
            type: 'string',
            default: '',
            required: true,
            description: 'API client ID for the technical user',
        },
        {
            displayName: 'Client Secret',
            name: 'clientSecret',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'API client secret for the technical user',
        },
    ];
}
