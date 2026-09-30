import { cookies } from "next/headers"; import crypto from "crypto";
export async function createOAuthState(platform:string){const state=crypto.randomBytes(24).toString("hex");(await cookies()).set(`creatoros_oauth_${platform}`,state,{httpOnly:true,secure:true,sameSite:"lax",maxAge:600,path:"/"});return state;}
export async function validateOAuthState(platform:string,state:string|null){if(!state)return false;const value=(await cookies()).get(`creatoros_oauth_${platform}`)?.value;return !!value&&value===state;}
export function configured(name:string){return Boolean(process.env[name]);}