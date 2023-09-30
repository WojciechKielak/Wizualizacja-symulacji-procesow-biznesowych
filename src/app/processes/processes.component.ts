import { Component } from '@angular/core';
import { Node, Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodess, clusterss, linkss } from './data';
import {uklad} from './MyLayout'
import * as shape from 'd3-shape';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent {
  // uklad = new uklad();
  public layout: Layout = new uklad ();

  // myCurve: any = customCurve;
  // myCurve: any = shape.curveStepAfter;
  // myCurve: any = shape.curveStepBefore;
  // myCurve: any = shape.curveStep;

  nodes: Node[] = nodess;


  links: Edge[] = linkss;


  clusters: ClusterNode[] = clusterss;
}
