import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class FreeFinance implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getClients(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCustomers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getSuppliers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getTaxClasses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getPaymentAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
