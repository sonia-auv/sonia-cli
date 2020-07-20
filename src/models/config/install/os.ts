import { InstallAction } from '.'

export interface OS {
    name: string;
    actions: InstallAction[];
}
