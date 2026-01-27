import {
    IDataObject,
    IExecuteFunctions,
    ILoadOptionsFunctions,
    INodeExecutionData,
    INodePropertyOptions,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    freefinanceApiRequest,
    freefinanceUploadDocument,
} from './GenericFunctions';

export class FreeFinance implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'FreeFinance',
        name: 'freefinance',
        icon: 'file:freefinance.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
        description: 'Consume FreeFinance REST API',
        defaults: {
            name: 'FreeFinance',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'freefinanceApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Account',
                        value: 'account',
                    },
                    {
                        name: 'Client',
                        value: 'client',
                    },
                    {
                        name: 'Customer',
                        value: 'customer',
                    },
                    {
                        name: 'Document',
                        value: 'document',
                    },
                    {
                        name: 'Incoming Invoice',
                        value: 'incomingInvoice',
                    },
                    {
                        name: 'Item',
                        value: 'item',
                    },
                    {
                        name: 'Outgoing Invoice',
                        value: 'outgoingInvoice',
                    },
                    {
                        name: 'Supplier',
                        value: 'supplier',
                    },
                ],
                default: 'client',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'account',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all accounts',
                        action: 'Get all accounts',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'client',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all clients',
                        action: 'Get all clients',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'customer',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a customer',
                        action: 'Create a customer',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a customer',
                        action: 'Get a customer',
                    },
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all customers',
                        action: 'Get all customers',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'supplier',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a supplier',
                        action: 'Create a supplier',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a supplier',
                        action: 'Get a supplier',
                    },
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all suppliers',
                        action: 'Get all suppliers',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'incomingInvoice',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an incoming invoice (simple)',
                        action: 'Create an incoming invoice',
                    },
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all incoming invoices',
                        action: 'Get all incoming invoices',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'outgoingInvoice',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an outgoing invoice (simple)',
                        action: 'Create an outgoing invoice',
                    },
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all outgoing invoices',
                        action: 'Get all outgoing invoices',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'item',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all items',
                        action: 'Get all items',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'document',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Upload',
                        value: 'upload',
                        description: 'Upload a document to the staging folder (Doku-Archiv)',
                        action: 'Upload a document',
                    },
                ],
                default: 'upload',
            },
            {
                displayName: 'Client',
                name: 'clientId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getClients',
                },
                required: true,
                displayOptions: {
                    hide: {
                        resource: [
                            'client',
                        ],
                    },
                },
                default: '',
                description: 'The bookkeeping client to use',
            },
            // --- GET Parameters ---
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'get',
                        ],
                    },
                },
                default: '',
                description: 'The ID of the resource to fetch',
            },
            // --- GET ALL Parameters ---
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                displayOptions: {
                    show: {
                        operation: [
                            'getAll',
                        ],
                    },
                },
                default: 50,
                description: 'Max number of results to return',
            },
            // --- CREATE Parameters (Customer & Supplier) ---
            {
                displayName: 'Company Name',
                name: 'companyName',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                default: '',
                description: 'Company name. Required if First/Last Name not provided.',
            },
            {
                displayName: 'First Name',
                name: 'firstName',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Last Name',
                name: 'lastName',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                default: '',
            },
            {
                displayName: 'City',
                name: 'city',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['customer', 'supplier'],
                    },
                },
                options: [
                    {
                        displayName: 'Street',
                        name: 'street',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Zip Code',
                        name: 'zip_code',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Country',
                        name: 'country',
                        type: 'string',
                        default: 'AT',
                    },
                ],
            },
            // --- CREATE Parameters (Invoices) ---
            {
                displayName: 'Customer',
                name: 'customerId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getCustomers',
                    loadOptionsDependsOn: ['clientId'],
                },
                required: true,
                displayOptions: {
                    show: {
                        resource: ['outgoingInvoice'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'The customer for the invoice',
            },
            {
                displayName: 'Supplier',
                name: 'supplierId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getSuppliers',
                    loadOptionsDependsOn: ['clientId'],
                },
                required: true,
                displayOptions: {
                    show: {
                        resource: ['incomingInvoice'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'The supplier for the invoice',
            },
            {
                displayName: 'Account',
                name: 'accountId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getAccounts',
                    loadOptionsDependsOn: ['clientId'],
                },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                default: '',
                description: 'The bookkeeping account to use for the invoice line',
            },
            {
                displayName: 'Tax Class',
                name: 'taxClassId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getTaxClasses',
                    loadOptionsDependsOn: ['clientId'],
                },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                default: '',
                description: 'The tax class to use for the invoice line',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Total Amount (Gross)',
                name: 'amount',
                type: 'number',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                default: 0,
            },
            {
                displayName: 'Invoice Date',
                name: 'invoiceDate',
                type: 'dateTime',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Paid',
                name: 'paid',
                type: 'boolean',
                default: false,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                    },
                },
                description: 'Whether the invoice is already paid',
            },
            {
                displayName: 'Payment Account',
                name: 'paymentAccountId',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getPaymentAccounts',
                    loadOptionsDependsOn: ['clientId'],
                },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                        paid: [true],
                    },
                },
                default: '',
                description: 'The account used to pay the invoice',
            },
            {
                displayName: 'Paid Date',
                name: 'paidDate',
                type: 'dateTime',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['incomingInvoice', 'outgoingInvoice'],
                        paid: [true],
                    },
                },
                default: '',
                description: 'The date the invoice was paid',
            },
            // --- Document Upload Parameters ---
            {
                displayName: 'Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['upload'],
                    },
                },
                default: 'data',
                description: 'Name of the binary property containing the file to upload (PDF, image, XML, etc.)',
            },
            {
                displayName: 'File Name',
                name: 'fileName',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['upload'],
                    },
                },
                default: '',
                description: 'Override the file name. If empty, uses the name from binary data.',
            },
            {
                displayName: 'Description',
                name: 'documentDescription',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['upload'],
                    },
                },
                default: '',
                description: 'Optional description for the document (used for search)',
            },
            {
                displayName: 'Skip OCR',
                name: 'skipOcr',
                type: 'boolean',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['upload'],
                    },
                },
                default: false,
                description: 'Whether to skip automatic OCR processing of the document',
            },
        ],
    };

    methods = {
        loadOptions: {
            async getClients(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const responseData = await freefinanceApiRequest.call(this, 'GET', '/clients') as IDataObject;
                const clients = responseData.content as IDataObject[];
                return clients.map((client) => ({
                    name: client.display_name as string,
                    value: client.id as string,
                }));
            },
            async getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const clientId = this.getCurrentNodeParameter('clientId') as string;
                const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/cbs/accounts`) as IDataObject;
                const accounts = responseData.content as IDataObject[];
                return accounts.map((account) => ({
                    name: `${account.code} - ${account.display_name}`,
                    value: account.id as string,
                }));
            },
            async getCustomers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const clientId = this.getCurrentNodeParameter('clientId') as string;
                const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/customers`) as IDataObject;
                const customers = responseData.content as IDataObject[];
                return customers.map((customer) => ({
                    name: customer.company_name ? (customer.company_name as string) : `${customer.first_name} ${customer.last_name}`,
                    value: customer.id as string,
                }));
            },
            async getSuppliers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const clientId = this.getCurrentNodeParameter('clientId') as string;
                const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/suppliers`) as IDataObject;
                const suppliers = responseData.content as IDataObject[];
                return suppliers.map((supplier) => ({
                    name: supplier.company_name ? (supplier.company_name as string) : `${supplier.first_name} ${supplier.last_name}`,
                    value: supplier.id as string,
                }));
            },
            async getTaxClasses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const clientId = this.getCurrentNodeParameter('clientId') as string;
                const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/fis/tax_classes`) as IDataObject;
                const taxClasses = responseData.content as IDataObject[];
                return taxClasses.map((taxClass) => ({
                    name: taxClass.display_name as string,
                    value: taxClass.id as string,
                }));
            },
            async getPaymentAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const clientId = this.getCurrentNodeParameter('clientId') as string;
                const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/cbs/payment_accounts`) as IDataObject;
                const accounts = responseData.content as IDataObject[];
                return accounts.map((account) => ({
                    name: `${account.code} - ${account.display_name}`,
                    value: account.id as string,
                }));
            },
        },
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                const clientId = (resource !== 'client') ? this.getNodeParameter('clientId', i) as string : '';

                if (resource === 'client') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', '/clients', {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    }
                } else if (resource === 'account') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/cbs/accounts`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    }
                } else if (resource === 'customer') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/customers`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    } else if (operation === 'get') {
                        const id = this.getNodeParameter('id', i) as string;
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/customers/${id}`) as IDataObject;
                        returnData.push({ json: responseData });
                    } else if (operation === 'create') {
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        const body: IDataObject = {
                            company_name: this.getNodeParameter('companyName', i) as string,
                            first_name: this.getNodeParameter('firstName', i) as string,
                            last_name: this.getNodeParameter('lastName', i) as string,
                            email_address: this.getNodeParameter('email', i) as string,
                            city: this.getNodeParameter('city', i) as string,
                            ...additionalFields,
                        };
                        const responseData = await freefinanceApiRequest.call(this, 'POST', `/clients/${clientId}/mas/customers`, body) as IDataObject;
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'supplier') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/suppliers`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    } else if (operation === 'get') {
                        const id = this.getNodeParameter('id', i) as string;
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/mas/suppliers/${id}`) as IDataObject;
                        returnData.push({ json: responseData });
                    } else if (operation === 'create') {
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        const body: IDataObject = {
                            company_name: this.getNodeParameter('companyName', i) as string,
                            first_name: this.getNodeParameter('firstName', i) as string,
                            last_name: this.getNodeParameter('lastName', i) as string,
                            email_address: this.getNodeParameter('email', i) as string,
                            city: this.getNodeParameter('city', i) as string,
                            ...additionalFields,
                        };
                        const responseData = await freefinanceApiRequest.call(this, 'POST', `/clients/${clientId}/mas/suppliers`, body) as IDataObject;
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'incomingInvoice') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/cbi/incoming_invoices`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    } else if (operation === 'create') {
                        const supplierId = this.getNodeParameter('supplierId', i) as string;
                        const accountId = this.getNodeParameter('accountId', i) as string;
                        const taxClassId = this.getNodeParameter('taxClassId', i) as string;
                        const totalAmount = this.getNodeParameter('amount', i) as number;
                        const description = this.getNodeParameter('description', i) as string;
                        const invoiceDate = this.getNodeParameter('invoiceDate', i) as string;

                        const body: IDataObject = {
                            supplier: supplierId,
                            description,
                            total: totalAmount,
                            invoice_date: invoiceDate,
                            lines: [
                                {
                                    account: accountId,
                                    amount: totalAmount,
                                    amount_type: 'GROSS',
                                    description,
                                    taxes: {
                                        tax_1: {
                                            tax_class: taxClassId,
                                        },
                                    },
                                },
                            ],
                        };

                        if (this.getNodeParameter('paid', i) as boolean) {
                            body.paid_date = this.getNodeParameter('paidDate', i) as string;
                            body.paid_contra_account = this.getNodeParameter('paymentAccountId', i) as string;
                        }

                        const responseData = await freefinanceApiRequest.call(this, 'POST', `/clients/${clientId}/cbi/incoming_invoices`, body) as IDataObject;
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'outgoingInvoice') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/cbi/outgoing_invoices`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    } else if (operation === 'create') {
                        const customerId = this.getNodeParameter('customerId', i) as string;
                        const accountId = this.getNodeParameter('accountId', i) as string;
                        const taxClassId = this.getNodeParameter('taxClassId', i) as string;
                        const totalAmount = this.getNodeParameter('amount', i) as number;
                        const description = this.getNodeParameter('description', i) as string;
                        const invoiceDate = this.getNodeParameter('invoiceDate', i) as string;

                        const body: IDataObject = {
                            customer: customerId,
                            description,
                            total: totalAmount,
                            invoice_date: invoiceDate,
                            lines: [
                                {
                                    account: accountId,
                                    amount: totalAmount,
                                    amount_type: 'GROSS',
                                    description,
                                    taxes: {
                                        tax_1: {
                                            tax_class: taxClassId,
                                        },
                                    },
                                },
                            ],
                        };

                        if (this.getNodeParameter('paid', i) as boolean) {
                            body.paid_date = this.getNodeParameter('paidDate', i) as string;
                            body.paid_contra_account = this.getNodeParameter('paymentAccountId', i) as string;
                        }

                        const responseData = await freefinanceApiRequest.call(this, 'POST', `/clients/${clientId}/cbi/outgoing_invoices`, body) as IDataObject;
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'item') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i) as number;
                        const qs: IDataObject = { limit };
                        const responseData = await freefinanceApiRequest.call(this, 'GET', `/clients/${clientId}/itm/items`, {}, qs) as IDataObject;
                        const executionData = this.helpers.returnJsonArray(responseData.content as IDataObject[]);
                        returnData.push(...executionData);
                    }
                } else if (resource === 'document') {
                    if (operation === 'upload') {
                        const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
                        const fileName = this.getNodeParameter('fileName', i) as string;
                        const documentDescription = this.getNodeParameter('documentDescription', i) as string;
                        const skipOcr = this.getNodeParameter('skipOcr', i) as boolean;

                        // Get binary data from the input
                        const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                        const fileContent = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

                        const responseData = await freefinanceUploadDocument.call(
                            this,
                            clientId,
                            binaryData,
                            fileContent,
                            {
                                fileName: fileName || undefined,
                                description: documentDescription || undefined,
                                skipOcr,
                            },
                        );
                        returnData.push({ json: responseData as IDataObject });
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: (error as Error).message } });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}
