export type Platform="youtube"|"tiktok"|"instagram"|"facebook";
export type PlatformConnection={platform:Platform;accountId:string;displayName:string;connectedAt:string};
export interface PlatformAdapter{platform:Platform;getAuthorizationUrl(state:string):string;exchangeCode(code:string):Promise<unknown>;syncAccount(connection:PlatformConnection):Promise<void>;}