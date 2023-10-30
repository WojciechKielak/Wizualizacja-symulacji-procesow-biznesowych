import { Component, OnInit } from '@angular/core';
import { Node, Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes, clusters, links, nodess, clusterss, linkss } from './data';
import {myLayout} from './MyLayout'
import * as shape from 'd3-shape';
import customCurve from './MyCurve';
import { ProcessesService } from './services/processes.service';
import { OrganizationList } from '../models/organization';
import { ProcessList } from '../models/process';
import { ActivatedRoute, Router } from '@angular/router';
import { EventList } from './event';
import { ResourceList } from './resource';
import { GeneratorList } from './generator';
import { PollList } from './poll';
import { forkJoin } from 'rxjs';
import { GateList } from './gate';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Numeric } from 'd3';

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
  eventList: EventList[] = [];
  resourceList: ResourceList[] = [];
  generatorList: GeneratorList[] = [];
  pollList: PollList[]=[];
  xorList: GateList[]=[];
  orList: GateList[]=[];
  isRunning: boolean = false;
  idSimulations: number[]=[];
  constructor(private processesService: ProcessesService, private route: ActivatedRoute,
    private router: Router){}
  
  step(element: PollList,event: EventList| undefined): void {
    while( event?.output != null ){
      console.log("ID: "+ event?.id)
      console.log(element.poll.nodes.find(value => value.id === event?.id.toString()));
      if(element.poll.nodes.find(value => value.id === event?.id.toString()) !== undefined)break;  

      element.poll?.links.push({ source: event.id.toString() , target: event.output.toString()})

      if( !element.poll?.clusters.find(value => value.id === event?.resource.toString() +'P')){
        let resorc = this.resourceList.find(value => value.id === event?.resource);
        element.poll!.clusters.push( {
          id: event.resource.toString()+'P',
          label: resorc?.name,
          childNodeIds: [event.id.toString()]
        })
      }
      else{
        let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
        element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push(event.id.toString());
      }

      if( event.id === element.startEvent!){
      element.poll!.nodes.push( {
        id: event.id.toString(),
        label: event.name,
        data: {shape: 'circle'}
      })
      }else{
        element.poll!.nodes.push( {
          id: event.id.toString(),
          label: event.name,
          data: {shape: '',task:event.type, monitor_pending: event.monitor_pending, 
          monitor_execute: event.monitor_execute,monitor_realized:  event.monitor_realized}
          });
      }
      let nextId = event.output;
      event = this.eventList.find(value => value.id === event!.output);
      console.log(event !== undefined);
      if(event !== undefined){
        if(event?.output === null){
          if( !element.poll?.clusters.find(value => value.id === event?.resource.toString() +'P')){
            let resorc = this.resourceList.find(value => value.id === event?.resource);
            element.poll!.clusters.push( {
              id: event.resource.toString()+'P',
              label: resorc?.name,
              childNodeIds: [event.id.toString()]
            })
          }
          else{
            let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
            element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push(event.id.toString());
          }

          element.poll!.nodes.push( {
            id: event.id.toString(),
            label: event.name,
            data: {shape: 'circle'}
          });
        }
      }else{
        let gateName='xor';
        let gate = this.xorList.find(value => value.id === nextId);
        if(gate === undefined){
          gate = this.orList.find(value => value.id === nextId);
          gateName='or';
        }
        
        if(gate !== undefined){
          if(element.poll.nodes.find(value => value.id === nextId.toString()) !== undefined)break;
          element.poll!.nodes.push( {
            id: gate.id.toString(),
            label: "X",
            data: {shape: 'diamond', gate:gateName}
          });


          if( !element.poll?.clusters.find(value => value.id === gate?.resource.toString() +'P')){
            let resorc = this.resourceList.find(value => value.id === gate?.resource);
            element.poll!.clusters.push( {
              id: gate.resource.toString()+'P',
              label: resorc?.name,
              childNodeIds: [gate.id.toString()]
            })
          }
          else{
            let lane = element.poll.clusters.find(value => value.id === gate?.resource.toString()+'P');
            element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push(gate.id.toString());
          }
        }
        console.log(Object.keys(gate!.parameters));
        Object.keys(gate!.parameters).forEach(el => {console.log(el)
          event = this.eventList.find(value => value.id.toString() === el);
          element.poll?.links.push({ source: gate!.id.toString() , target: el});
          this.step(element, event);
        });
        // gate?.parameters.forEach(element => {console.log(element)});
      }
    }
    if(element.poll.nodes.find(value => value.id === event?.id.toString()) === undefined){
      if(event?.output === null){
        if( !element.poll?.clusters.find(value => value.id === event?.resource.toString() +'P')){
          let resorc = this.resourceList.find(value => value.id === event?.resource);
          element.poll!.clusters.push( {
            id: event.resource.toString()+'P',
            label: resorc?.name,
            childNodeIds: [event.id.toString()]
          })
        }
        else{
          let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
          element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push(event.id.toString());
        }
  
        element.poll!.nodes.push( {
          id: event.id.toString(),
          label: event.name,
          data: {shape: 'circle'}
        });
      }
    }
    
  }
  ngOnInit(): void {

const idString = this.route.snapshot.paramMap.get('processesid');
  if (idString !== null) {
    this.id = parseInt(idString, 10);
    if (!isNaN(this.id)) {
      const processes$ = this.processesService.getProcesses(this.id);
      const events$ = this.processesService.getEvents();
      const resources$ = this.processesService.getResources();
      const generators$ = this.processesService.getGenerators();
      const xors$ = this.processesService.getGatewaysXor();
      const ors$ = this.processesService.getGatewaysOr();

      forkJoin([processes$, events$, resources$, generators$,xors$,ors$]).subscribe(([processes,events, resources, generators,xors,ors]) => {
        this.eventList = events;
        this.resourceList = resources;
        this.generatorList = generators;
        this.processesList = processes;
        this.xorList = xors;
        this.orList = ors;

        console.log("przed");
        console.log(this.eventList);
        console.log(this.resourceList);
        console.log(this.generatorList);
        console.log(this.processesList);
        console.log(this.xorList);
        console.log(this.orList);
        if(this.processesList.length ===0) this.router.navigateByUrl('/models');
        this.processesList.forEach(element => {
          if (element.simulation !== undefined) {
            if (!this.idSimulations.includes(element.simulation)) {
              this.idSimulations.push(element.simulation);
            }
          }
          console.log(element.generator);
          const startEvent = this.generatorList.find(value => value.id === element.generator);
          console.log( startEvent);
          this.pollList.push({ id: element.id, name: element.name, startEvent: startEvent?.event, poll:{
            nodes: [],
            clusters: [],
            links: []
          } });
        });
        
        this.pollList.forEach(element => {
          let event = this.eventList.find(value => value.id === element.startEvent);
          this.step(element, event);
         
          
        });

        console.log("po");
        console.log(this.pollList);
        



      });

    } else {
      console.error('processes/processes.component processid nie jest liczba');
    }
  } else {
    console.error('processes/processes.component processid jest nullem');
  }

  console.log("koniec");
  
  }

  diamondPoints(width: number, height: number): string {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
  
    return `0,${halfHeight} ${halfWidth},0 ${width},${halfHeight} ${halfWidth},${height} 0,${halfHeight}`;
  }

  onStop(){
    // this.nodes=nodess;
    // this.links=linkss;
    // this.clusters = clusterss;
    // console.log(this.nodes);
    this.isRunning = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// onStart() {
//   console.log("Start");
//   this.isRunning = true;
//   this.processesService.getRun(1);
  
//   const symulation = async () => {
//     while (this.isRunning) {
//       try {
//         const data = await this.processesService.getEvents().toPromise(); // Poczekaj na dane
        
//         this.eventList = data;
//         console.log(data);
//         console.log("HH");

//         this.pollList.forEach(element => {
//           element.poll.nodes.forEach(eve => {
//             if (eve.data.shape === "") {
//               console.log(eve);
//               console.log("ALA");
//               let event = this.eventList.find(value => value.id.toString() === eve.id);
//               if (event !== null) {
//                 console.log("BASIA");
//                 element.poll.nodes[element.poll.nodes.indexOf(eve)].data.monitor_pending = event!.monitor_pending;
//               }
//             }
//           });
//         });

//         console.log("A");
//         console.log(this.pollList);
//       } catch (error) {
//         console.error(error);
//       }
//       await this.sleep(1000); // Poczekaj 1 sekundę
//     }
//     console.log("koniec");
//   }

//   symulation();
// }
  onStart(){
    console.log("Start");
    this.isRunning = true;
    for(let i = 0; i < this.idSimulations.length; i++) {
      this.processesService.getRun(this.idSimulations[i]).subscribe(data => {
        console.log(data);
      });
    }
    // this.processesService.getRun(1).subscribe(data => {
    //   console.log(data);
    // });
    const symulation = async () => {
        while (this.isRunning) {
          const data = await this.processesService.getEvents().toPromise(); // Poczekaj na dane
          this.eventList = data;
          console.log(data);
          console.log("HH");
          this.pollList.forEach(element => {
            element.poll.nodes.forEach( eve => {
              if( eve.data.shape === ""){
                let event = this.eventList.find(value => value.id.toString() === eve.id);
                if( event !== null ){
                  console.log("nre " +  event!.monitor_realized);
                  console.log(this.eventList);
                  // element.poll.nodes[element.poll.nodes.indexOf(eve)].data.monitor_pending= event!.monitor_pending;
                  // element.poll.nodes[element.poll.nodes.indexOf(eve)].data.monitor_execute= event!.monitor_execute;
                  // element.poll.nodes[element.poll.nodes.indexOf(eve)].data.monitor_realized= event!.monitor_realized;
                  eve.data.monitor_pending= event!.monitor_pending;
                  eve.data.monitor_execute= event!.monitor_execute;
                  eve.data.monitor_realized= event!.monitor_realized;
                }
              }
            })

          });
          console.log("A");
          console.log(this.pollList);
          
          await this.sleep(1000);
        }
        console.log("koniec");
      }
    symulation();

  }

}
