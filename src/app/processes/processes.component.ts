import { Component, OnInit } from '@angular/core';
import { Node, Edge, ClusterNode, Layout } from '@swimlane/ngx-graph';
import {myLayout} from './MyLayout'
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
import { GateAndList } from './gateAnd';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{
  public layout: Layout = new myLayout ();

  myCurve: any = customCurve;
  id: number =0;
  nodes: Node[] = [];
  links: Edge[] = [];
  clusters: ClusterNode[] = [];
  organizationList: OrganizationList[] = [];
  processesList: ProcessList[] = [];
  eventList: EventList[] = [];
  resourceList: ResourceList[] = [];
  generatorList: GeneratorList[] = [];
  pollList: PollList[]=[];
  xorList: GateList[]=[];
  orList: GateList[]=[];
  andList: GateAndList[]=[];
  isRunning: boolean = false;
  idSimulation!: number;
  idRunningSimulations: string[]=[];
  idRunningSimulation: string | undefined;
  constructor(private processesService: ProcessesService, private route: ActivatedRoute,
    private router: Router){}
  
  step(element: PollList,event: EventList| undefined): void {
    while( event?.output != null ){
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
        id: 's',
        label: 'start',
        data: {shape: 'circle'}
      });
      let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
      element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('s');
      element.poll?.links.push({ source:'s' , target: event.id.toString()});
      element.poll!.nodes.push( {
        id: event.id.toString(),
        label: event.name,
        data: {shape: '',task:event.type, monitor_pending: 0, 
          monitor_execute: 0,monitor_realized: 0}
      })
      }else{
        element.poll!.nodes.push( {
          id: event.id.toString(),
          label: event.name,
          data: {shape: '',task:event.type, monitor_pending: 0, 
          monitor_execute: 0,monitor_realized:  0}
          });
      }
      let nextId = event.output;
      event = this.eventList.find(value => value.id === event!.output);
      if(event !== undefined){
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
              data: {shape: '',task:event.type, monitor_pending: 0, 
              monitor_execute: 0,monitor_realized:  0}
            });
    
            element.poll!.nodes.push( {
              id: 'k'+event.id.toString(),
              label: 'koniec',
              data: {shape: 'circle'}
            });
            let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
            element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('k'+event.id.toString());
            element.poll?.links.push({ source:event.id.toString() , target: 'k'+event.id.toString()});
          }
        }
      }else{
        let nextGate = true;
        while (nextGate)
          {
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
            if(gate === undefined){
              let gateAnd = this.andList.find(value => value.id === nextId);
              gateName='and';
    
              if( gateAnd !== undefined){
                if(element.poll.nodes.find(value => value.id === nextId.toString()) !== undefined)break;
              element.poll!.nodes.push( {
                id: gateAnd!.id.toString(),
                label: "+",
                data: {shape: 'diamond', gate:gateName}
              });
    
              if( !element.poll?.clusters.find(value => value.id === gateAnd?.resource.toString() +'P')){
                  let resorc = this.resourceList.find(value => value.id === gateAnd?.resource);
                  element.poll!.clusters.push( {
                    id: gateAnd!.resource.toString()+'P',
                    label: resorc?.name,
                    childNodeIds: [gateAnd!.id.toString()]
                  })
                  if (gateAnd && gateAnd.id_list && gateAnd.id_list.length > 0)
                  {
                    gateAnd!.id_list.forEach(el => {
                      event = this.eventList.find(value => value.id === el);
                      element.poll?.links.push({ source: gateAnd!.id.toString() , target: el.toString()});
                      if(event!== undefined){
                        this.step(element, event);
                        nextGate = false;
                      }
                      else{
                        nextId = Number(el);
                        nextGate = true;
                      }
                    });
                  }
                  else{
                    let lane = element.poll.clusters.find(value => value.id === gateAnd?.resource.toString()+'P');
                    element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('k'+gateAnd!.id.toString());
                    element.poll!.nodes.push( {
                      id: 'k'+gateAnd.id.toString(),
                      label: 'koniec',
                      data: {shape: 'circle'}
                    });
                    element.poll?.links.push({ source:gateAnd.id.toString() , target: 'k'+gateAnd.id.toString()});
                  }
                  
                }
                else{
                  let lane = element.poll.clusters.find(value => value.id === gateAnd?.resource.toString()+'P');
                  element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push(gateAnd!.id.toString());
                  if (gateAnd && gateAnd.id_list && gateAnd.id_list.length > 0)
                  {
                    gateAnd!.id_list.forEach(el => {
                      event = this.eventList.find(value => value.id === el);
                      element.poll?.links.push({ source: gateAnd!.id.toString() , target: el.toString()});
                      if(event!== undefined){
                        this.step(element, event);
                        nextGate = false;
                      }
                      else{
                        nextId = Number(el);
                        nextGate = true;
                      }
                    });
                  }
                  else{
                    let lane = element.poll.clusters.find(value => value.id === gateAnd?.resource.toString()+'P');
                    element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('k'+gateAnd!.id.toString());
                    element.poll!.nodes.push( {
                      id: 'k'+gateAnd.id.toString(),
                      label: 'koniec',
                      data: {shape: 'circle'}
                    });
                    element.poll?.links.push({ source:gateAnd.id.toString() , target: 'k'+gateAnd.id.toString()});
                  }
                }
              }
    
            }else{
            if (gate && gate.percentages && Object.keys(gate.percentages).length > 0){
              Object.keys(gate!.percentages).forEach(el => {
                event = this.eventList.find(value => value.id.toString() === el);
                element.poll?.links.push({ source: gate!.id.toString() , target: el});
                if(event!== undefined){
                  this.step(element, event);
                  nextGate = false;
                }
                else{
                  nextId = Number(el);
                  nextGate = true;
                }
              });
            }else{
              let lane = element.poll.clusters.find(value => value.id === gate?.resource.toString()+'P');
              element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('k'+gate!.id.toString());
              element.poll!.nodes.push( {
                id: 'k'+gate.id.toString(),
                label: 'koniec',
                data: {shape: 'circle'}
              });
              element.poll?.links.push({ source:gate.id.toString() , target: 'k'+gate.id.toString()});
            }
            
            }  
          }
        
      }
    }
    if( (event?.id === element.startEvent! || element.poll.nodes.find(value => value.id === event?.id.toString()) === undefined) && event?.output === null ){
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
      if( event?.id === element.startEvent! ){
        element.poll!.nodes.push( {
          id: 's',
          label: 'start',
          data: {shape: 'circle'}
        });
        let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
      element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('s');
      element.poll?.links.push({ source:'s' , target: event.id.toString()});
      }

      
      element.poll!.nodes.push( {
        id: event.id.toString(),
        label: event.name,
        data: {shape: '',task:event.type, monitor_pending: 0, 
          monitor_execute: 0,monitor_realized:  0}
      })

      element.poll?.links.push({ source:event.id.toString() , target: 'k'+event.id.toString()});
      element.poll!.nodes.push( {
        id: 'k'+event.id.toString(),
        label: 'koniec',
        data: {shape: 'circle'}
      });
       let lane = element.poll.clusters.find(value => value.id === event?.resource.toString()+'P');
      element.poll.clusters[element.poll.clusters.indexOf(lane!)].childNodeIds!.push('k'+event.id.toString());
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
      const ands$ = this.processesService.getGatewaysAnd();

      forkJoin([processes$, events$, resources$, generators$,xors$,ors$,ands$]).subscribe(([processes,events, resources, generators,xors,ors,ands]) => {
        this.eventList = events;
        this.resourceList = resources;
        this.generatorList = generators;
        this.processesList = processes;
        this.xorList = xors;
        this.orList = ors;
        this.andList = ands;

        if(this.processesList.length ===0) this.router.navigateByUrl('/models');
        this.processesList.forEach(element => {
          if (element.simulation !== undefined) {
            this.idSimulation= element.simulation;
          }
          const startEvent = this.generatorList.find(value => value.id === element.generator);
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

      });

    } else {
      console.error('processes/processes.component processid nie jest liczba');
    }
  } else {
    console.error('processes/processes.component processid jest nullem');
  }

  
  }

  diamondPoints(width: number, height: number): string {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
  
    return `0,${halfHeight} ${halfWidth},0 ${width},${halfHeight} ${halfWidth},${height} 0,${halfHeight}`;
  }

  async onStop(){
    this.isRunning = false;
    try {
      const data = await this.processesService.getEnd(this.idSimulation).toPromise();

  } catch (error) {
      console.error("Wystąpił błąd podczas resecie symulacji", error);
  }
  }
  async onReset(){
    this.isRunning = false;

    try {
      const data = await this.processesService.getEnd(this.idSimulation).toPromise();
  } catch (error) {
      console.error("Wystąpił błąd podczas resetu symulacji", error);
  }
  this.pollList.forEach(element => {
    element.poll.nodes.forEach( eve => {
      if( eve.data.shape === ""){
          eve.data.monitor_pending= 0;
          eve.data.monitor_execute= 0;
          eve.data.monitor_realized= 0;
      }
    })

  });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async onStart(){
    this.isRunning = true;
    try {
      const data = await this.processesService.getRun(this.idSimulation).toPromise();
      this.idRunningSimulation = data;
      await this.sleep(100);
  } catch (error) {
  }

    const symulation = async () => {
        while (this.isRunning) {
          const data = await this.processesService.getEvents().toPromise(); 
          this.eventList = data;
          this.pollList.forEach(element => {
            element.poll.nodes.forEach( eve => {
              if( eve.data.shape === ""){
                let event = this.eventList.find(value => value.id.toString() === eve.id);
                if( event !== null ){
                  eve.data.monitor_pending= event!.monitor_pending;
                  eve.data.monitor_execute= event!.monitor_execute;
                  eve.data.monitor_realized= event!.monitor_realized;
                }
              }
            })

          });

          this.processesService.getRunningSimulation(this.idRunningSimulation!).subscribe(async data => {
            if( data === "SUCCEED"){
              this.isRunning = false;
              this.router.navigateByUrl(`/report/${this.idRunningSimulation}`);
            }
          });
          await this.sleep(1000);

        }
      }
    symulation();

  }

}
