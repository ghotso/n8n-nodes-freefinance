/// <reference types="node" />
/// <reference types="node" />
import { IDataObject, IExecuteFunctions, IHttpRequestMethods, ILoadOptionsFunctions, IBinaryData } from 'n8n-workflow';
export declare function freefinanceApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<import("n8n-workflow").IN8nHttpResponse | import("n8n-workflow").IN8nHttpFullResponse>;
export declare function freefinanceUploadDocument(this: IExecuteFunctions, clientId: string, binaryData: IBinaryData, fileContent: Buffer, options?: {
    fileName?: string;
    description?: string;
    skipOcr?: boolean;
}): Promise<import("n8n-workflow").IN8nHttpResponse | import("n8n-workflow").IN8nHttpFullResponse>;
