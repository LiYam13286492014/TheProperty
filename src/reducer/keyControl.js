export const keyReducer = (prevalue={keyValue:1},action)=>{
    const{type} = action

    switch(type){
        case 'update_it' :
            let newState = {...prevalue} //不能直接在当前空间修改状态
            newState.keyValue++
            return newState

        default :
        return prevalue
    }
}