export interface GateList{
    id: number;
    name: string;
    percentages: {
        [key: number]: number; 
    };
    resource: number;
}