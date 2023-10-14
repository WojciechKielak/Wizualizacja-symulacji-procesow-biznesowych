export interface GateList{
    id: number;
    name: string;
    parameters: {
        [key: string]: number; 
    };
    resource: number;
}