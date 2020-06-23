import {IDevice} from './iDevice'

export interface IPlatform {
    name: string;
    devices: IDevice[];
}
