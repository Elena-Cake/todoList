export type todoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: taskType[]
}

export type taskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'