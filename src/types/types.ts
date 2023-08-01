export type todoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
    isGhost: boolean
}

export type taskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'