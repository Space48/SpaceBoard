export type Team = 'red' | 'blue';

export interface InterfaceColumns {
    actions: string[],
    bad: string[],
    good: string[],
    [key: string]: string[],
}

export interface InterfaceTeamData {
    config?: object,
    data: InterfaceColumns,
    header?: object,
    request?: object,
    status: number,
    statusText?: string
}
