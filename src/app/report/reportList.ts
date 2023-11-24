interface RelatedObject {
    name: string;
    type: string;
    related_objects?: RelatedObject[];
  }
  
  interface Element {
    name: string;
    type: string;
    related_object?: RelatedObject;
    generator?: {
      name: string;
      generated: number;
    };
  }
  
  interface Project {
    name: string;
    elements: Element;
    generator: {
      name: string;
      generated: number;
    };
  }
  
  export  interface ResourceData {
    avg: number;
    sum: number;
    median: number;
    max_time: number;
    min_time: number;
    tasks_execute: number;
    tasks_pending: number;
    tasks_realized: number;
    number_of_employee: number;
  }
  
  export interface Resource {
    [key: string]: ResourceData | string | number;
    type: string;
    quantity: number;
    cost_of_use: number;
    hourly_salary: number;
  }
  
  export interface Resources {
    [key: string]: Resource | {};
  }
  
  export interface Report {
    projects: Project[];
    resources: Resources;
    'simulation duration': number;
  }
  
 export  interface DataReport {
    id: string;
    statistics: Report;
  }
  