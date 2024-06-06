
import { getBlogCategories } from '/lib/apis';



/**
 * Filter entity fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntity(entity){

    return{
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        description: entity.description,
    }
}

export async function getCategoriesData(request) {
    const { searchParams } = new URL(request.url)
    const order = searchParams.get('order')
    const per_page = searchParams.get('per_page')
    
    let entities
    const responseData = {
        success: false,
        categories: []
    };
    

    try {

        //Get categories
        const data = await getBlogCategories();
        //console.log('categ request:', data)
        
        
        entities = data
        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterEntity(entities[i]);
        }
        
        responseData.success = true
        responseData.categories =  entities
        
        
    }catch(error){
        responseData.error = error.message
    }
    //console.log('respos categ:', responseData)

    return Response.json({ responseData });
}