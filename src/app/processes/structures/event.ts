export interface EventList{
    id: number,
    name: string,
    type: string,
    output?: number,
    resource: number,
    monitor_pending: number,
    monitor_execute: number,
    monitor_realized: number,
}