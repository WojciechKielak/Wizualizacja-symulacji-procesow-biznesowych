import { Component, OnInit } from '@angular/core';
import { Node, Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes, clusters, links, nodess, clusterss, linkss } from './data';
import {myLayout} from './MyLayout'
import * as shape from 'd3-shape';
import customCurve from './MyCurve';
import { ProcessesService } from './services/processes.service';
import { OrganizationList } from '../models/organization';
import { ProcessList } from '../models/process';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{
  public layout: Layout = new myLayout ();

  myCurve: any = customCurve;
  // myCurve: any = shape.curveStepAfter;
  // myCurve: any = shape.curveStepBefore;
  // myCurve: any = shape.curveStep;

  id: number =0;
  nodes: Node[] = nodes;
  links: Edge[] = links;
  clusters: ClusterNode[] = clusters;
  organizationList: OrganizationList[] = [];
  processesList: ProcessList[] = [];
  constructor(private processesService: ProcessesService, private route: ActivatedRoute){}
  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('processesid');
  if (idString !== null) {
    this.id = parseInt(idString, 10);
    if (!isNaN(this.id)) {
      this.processesService.getProcesses(this.id).subscribe((response) => {
        this.processesList = response;
        console.log(response);
      });
    } else {
      console.error('processes/processes.component processid nie jest liczba');
    }
  } else {
    console.error('processes/processes.component processid jest nullem');
  }
    
    // this.processesService.getProcesses(this.id).subscribe((response) => {
    //   this.processesList=response;
    //   console.log(response);
    // });
  }

  diamondPoints(width: number, height: number): string {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
  
    return `0,${halfHeight} ${halfWidth},0 ${width},${halfHeight} ${halfWidth},${height} 0,${halfHeight}`;
  }

  change(){
    this.nodes=nodess;
    this.links=linkss;
    this.clusters = clusterss;
    console.log(this.nodes);
  }
  // const roomId = this.route.snapshot.paramMap.get('roomid');
}
