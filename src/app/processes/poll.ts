import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';
export interface PollList{
    id: number,
    name: string,
    startEvent: number | undefined,
    poll?: {
        nodes: Node[],
        clusters: ClusterNode[],
        links: Edge[],
    },
}