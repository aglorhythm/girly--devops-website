export function FieldsMissing({data}){
    return(
        
        data && <div className={`flex justify-center text-red-600 bg-red-200 max-w-[300px]`}> {`Remplissez les champs obligatoires !`}</div>
        
    )
}

export function DataSent({data}){
    return(
        
        data && <div className={`flex justify-center bg-green-200 max-w-[200px]`}> {`Message transmis !`}</div>
        
    )
}

export function CreatedAccount(){
    
}