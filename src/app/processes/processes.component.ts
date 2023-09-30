import { Component } from '@angular/core';
import { Node, Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodess, clusterss, linkss } from './data';
import {myLayout} from './MyLayout'
import * as shape from 'd3-shape';
import customCurve from './MyCurve';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent {
  public layout: Layout = new myLayout ();

  myCurve: any = customCurve;
  // myCurve: any = shape.curveStepAfter;
  // myCurve: any = shape.curveStepBefore;
  // myCurve: any = shape.curveStep;

  nodes: Node[] = nodess;


  links: Edge[] = linkss;


  clusters: ClusterNode[] = clusterss;
}
