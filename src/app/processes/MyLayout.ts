import{Layout} from '@swimlane/ngx-graph/lib/models/layout.model'
import { Graph } from '@swimlane/ngx-graph/lib/models/graph.model';
import * as dagre from 'dagre';
import { Edge } from '@swimlane/ngx-graph/lib/models/edge.model';
import { Node, ClusterNode } from '@swimlane/ngx-graph/lib/models/node.model';
import * as shortid from 'shortid';

export enum Orientation {
    LEFT_TO_RIGHT = 'LR',
    RIGHT_TO_LEFT = 'RL',
    TOP_TO_BOTTOM = 'TB',
    BOTTOM_TO_TOM = 'BT'
  }
  export enum Alignment {
    CENTER = 'C',
    UP_LEFT = 'UL',
    UP_RIGHT = 'UR',
    DOWN_LEFT = 'DL',
    DOWN_RIGHT = 'DR'
  }
  
  export interface DagreSettings {
    orientation?: Orientation;
    marginX?: number;
    marginY?: number;
    edgePadding?: number;
    rankPadding?: number;
    nodePadding?: number;
    align?: Alignment;
    acyclicer?: 'greedy' | undefined;
    ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
    multigraph?: boolean;
    compound?: boolean;
  }
  

export class myLayout implements Layout {

      defaultSettings: DagreSettings = {
        orientation: Orientation.LEFT_TO_RIGHT,
        marginX: 40,
        marginY: 10,
        edgePadding: 0,
        rankPadding: 100,
        nodePadding: 100,
        multigraph: true,
        compound: true,
        ranker:'longest-path',
      };
      settings: DagreSettings = {};
    
      dagreGraph: any;
      dagreNodes: Node[] = [];
      dagreClusters: ClusterNode[] = [];
      dagreEdges: any;

      clusterID!:string;
    
      run(graph: Graph): Graph {
        this.createDagreGraph(graph);
        dagre.layout(this.dagreGraph);
        // console.log(dagre);
    
        graph.edgeLabels = this.dagreGraph._edgeLabels;
    
        
        const dagreToOutput = (node:Node) => {
          const dagreNode = this.dagreGraph._nodes[node.id];
          // console.log("degere");
          // console.log(this.dagreGraph);
          // console.log(Object.keys(this.dagreGraph._preds[node.id]).length === 0);
        if(Object.keys(this.dagreGraph._preds[node.id]).length === 0){
          this.clusterID = this.dagreGraph._parent[node.id]
           console.log(this.clusterID);
        }
        // console.log(dagreNode);
        if(dagreNode.data.shape === 'diamond' && dagreNode.dimension.height< 40 && dagreNode.dimension.width<40){
          // console.log(dagreNode.dimension.height + "  "+ dagreNode.dimension.width + " "+ dagreNode.id)
          dagreNode.dimension.height= 1.5 * dagreNode.dimension.height;
          dagreNode.dimension.width= 1.5 * dagreNode.dimension.width;
          // console.log(dagreNode.dimension.height + "  "+ dagreNode.dimension.width + " "+ dagreNode.id)
        }

          return {
            ...node,
            position: {
              x: dagreNode.x,
              y: dagreNode.y
            },
            dimension: {
              width: dagreNode.width,
              height: dagreNode.height
            }
          };
        };
    
        const dagreToOutput2 = (node:Node) => {
          const dagreNode = this.dagreGraph._nodes[node.id];
          const dagreNode2 = this.dagreGraph._nodes[this.clusterID];
          console.log(dagreNode);
          console.log("degere");
          return {
            ...node,
            position: {
              x: dagreNode2.x,
              y: dagreNode.y
            },
            dimension: {
              width: dagreNode2.width,
              height: dagreNode.height
            }
          };
          
        };
        graph.nodes = graph.nodes.map(dagreToOutput);
        //this.gr = graph.nodes.map(dagreToOutput2);
        graph.clusters = (graph.clusters || []).map(dagreToOutput2);
        // graph.nodes = graph.nodes.map(dagreToOutput);
    
        // console.log(graph);
        return graph;
      }
    
      updateEdge(graph: Graph, edge: Edge): Graph {
        const sourceNode = graph.nodes.find(n => n.id === edge.source);
        const targetNode = graph.nodes.find(n => n.id === edge.target);
    
        if (sourceNode && sourceNode.dimension && targetNode && targetNode.dimension &&
          sourceNode.position && targetNode.position) {
            const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
            const startingPoint = {
                x: sourceNode.position.x ,
                y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
            };
            const endingPoint = {
                x: targetNode.position.x,
                y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
            };
    
            edge.points = [startingPoint, endingPoint];
            console.log("UUUUUUUUU");
        }
        else{
          console.log (" updateEdge  ERRRROR")
        }
        console.log("UUUUUUUUU");
    
        
        return graph;

    }
    

createDagreGraph(graph: Graph): any {
        const settings = Object.assign({}, this.defaultSettings, this.settings);
        this.dagreGraph = new dagre.graphlib.Graph({ compound: settings.compound, multigraph: settings.multigraph });
        this.dagreGraph.setGraph({
          rankdir: settings.orientation,
          marginx: settings.marginX,
          marginy: settings.marginY,
          edgesep: settings.edgePadding,
          ranksep: settings.rankPadding,
          nodesep: settings.nodePadding,
          align: settings.align,
          acyclicer: settings.acyclicer,
          ranker: settings.ranker,
          multigraph: settings.multigraph,
          compound: settings.compound,
        });
    
        // Default to assigning a new object as a label for each new edge.
        this.dagreGraph.setDefaultEdgeLabel(() => {
          return {
            /* empty */
          };
        });
    
        this.dagreNodes = graph.nodes.map((n: Node) => {
          const node: any = Object.assign({}, n);
          if(n && n.dimension && n.position)
          {node.width = n.dimension.width;
          node.height = n.dimension.height;
          node.x = n.position.x;
          node.y = n.position.y;
        }
          
          else{ console.log("createDagreGraph  this.dagreNodes Error");}
          return node;
        });
    
        this.dagreClusters = graph.clusters || [];
    
        this.dagreEdges = graph.edges.map(l => {
          const newLink: any = Object.assign({}, l);
          if (!newLink.id) {
            newLink.id = shortid.generate()
          }
          return newLink;
        });
    
        for (const node of this.dagreNodes) {
          this.dagreGraph.setNode(node.id, node);
        }
    
        for (const cluster of this.dagreClusters) {
          this.dagreGraph.setNode(cluster.id, cluster);
          if(cluster.childNodeIds)
          {cluster.childNodeIds.forEach(childNodeId => {
            this.dagreGraph.setParent(childNodeId, cluster.id);
          });
        }else console.log("createDagreGraph for (const cluster of this.dagreClusters) Error");
      }
    
        for (const edge of this.dagreEdges) {
          if (settings.multigraph) {
            this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
          } else {
            this.dagreGraph.setEdge(edge.source, edge.target);
          }
        }
    
        // console.log("hello");
        // console.log(this.dagreGraph);
        return this.dagreGraph;
      }

    }

