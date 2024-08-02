export const findSubdivisions = (subdivisionsAll,field) => {
    return subdivisionsAll?.find(item=>{
        if(field.includes('-')){
            if('responses' in item){
                return item.responses?.find((elem:any)=> {
                    if(field.split(" - ")[1] === elem.value){  
                        return elem
                    }      
                })
            }
            
            if(item.value === field.split(" - ")[1]){
                return item
            }else{
                return field.split(" - ")[1]
          }
        }else{
            if('responses' in item){
                return item.responses?.find((elem:any)=> {
                    if(field === elem.value){
                        return elem
                    }
                })
            }
            if(item.value === field){
                return item
            }else{
                return field
            }
        }
    
    })
}