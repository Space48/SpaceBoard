export type Team = 'red' | 'black' | 'yellow';

export interface InterfaceColumn {
    [key: string]: {
        message: string,
        upvotes: number,
        author: string
    },
}

export interface InterfaceColumns {
    actions: InterfaceColumn,
    bad: InterfaceColumn,
    good: InterfaceColumn,
    [key: string]: InterfaceColumn,
}

export interface InterfaceTeamData {
    config?: object,
    data: InterfaceColumns,
    header?: object,
    request?: object,
    status: number,
    statusText?: string
}
