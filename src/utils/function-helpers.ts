export const changeElemLocation = (list: Array<any>, idElemMoved: string, idElemOver: string) => {
    const listMoved = list.find(list => list.id === idElemMoved)
    const newLists = list.filter(list => list.id !== idElemMoved)
    let idElement = 0
    newLists.forEach((list, i) => {
        if (list.id === idElemOver) idElement = i
    })
    list[idElement + 1].isGhost = false
    if (listMoved) newLists.splice(idElement, 0, listMoved)
    list = newLists
}