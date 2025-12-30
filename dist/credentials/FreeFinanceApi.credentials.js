"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeFinanceApi = void 0;
class FreeFinanceApi {
    constructor() {
        this.name = 'freefinanceApi';
        this.displayName = 'FreeFinance API';
        this.documentationUrl = 'https://freefinance-dev.github.io/';
        this.properties = [
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
}
exports.FreeFinanceApi = FreeFinanceApi;
