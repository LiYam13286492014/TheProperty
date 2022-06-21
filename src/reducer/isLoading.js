export const loadingReducer = (prevalue={isLoading:false},action)=>{
    const{type,payload} = action

    switch(type){
        case 'chang_it' :
            let newState = {...prevalue} //不能直接在当前空间修改状态
            newState.isLoading = payload
            return newState

        default :
        return prevalue
    }
}