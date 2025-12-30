import { IDataObject, IExecuteFunctions, IHttpRequestMethods, ILoadOptionsFunctions } from 'n8n-workflow';
export declare function freefinanceApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<import("n8n-workflow").IN8nHttpResponse | import("n8n-workflow").IN8nHttpFullResponse>;
