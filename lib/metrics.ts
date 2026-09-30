export type NormalizedMetrics={views:number;likes:number;comments:number;shares:number;followers:number;engagementRate:number};
export function engagementRate(m:Pick<NormalizedMetrics,"likes"|"comments"|"shares"|"views">){return m.views?((m.likes+m.comments+m.shares)/m.views)*100:0;}
export function normalizeViews(value:number){return Math.max(0,Math.round(value));}