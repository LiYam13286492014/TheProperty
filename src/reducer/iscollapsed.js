export const collapsedReducer =(prevalue={isTrue:false},action)=>{
    const{type} = action

    switch(type){
        case 'chang_collapsed':
            let newData ={...prevalue}
            newData.isTrue = !newData.isTrue
            return newData


            default :
            return prevalue

        

    }
}