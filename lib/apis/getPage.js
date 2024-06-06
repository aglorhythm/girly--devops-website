
import { getPages, getMedias } from '/lib/apis';


/**
 * Retieve article featured image url
 * @param {*} id 
 * @returns 
 */
async function getFeaturedMedia(id){
    const media = await getMedias(id);
    const url = media.source_url
    

    if(media && media.id == id){
        return url
    }
}

/**
 * Filter entity fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntity(entity){

    //console.log('entity page:', entity)
    //const featuredMediaLink = entity.featured_media !== 0 && await getFeaturedMedia(entity.featured_media);

    return{
        id: entity.id,
        title: entity.title.rendered,
        date: entity.date,
        modified: entity.modified,
        link: entity.link,
        slug: entity.slug,
        short_description: entity.short_description,
        type: entity.type,
        content: entity.content.rendered,
        excerpt: entity.excerpt.rendered || 'A lorem ipseum.',
        author: entity.autor,
        meta_data: {
            title: entity.acf.meta_title,
            description: entity.acf.meta_description,
            language: entity.acf.language
        },
        
        //featured_media: featuredMediaLink,
        //categories: categoriesData,
    }
}

export async function getPageData(slug) {
   
    //Queries
    const slugQuery = `slug=${slug}`;

    let entity
    const responseData = {
        success: false,
        page: []
    };
    

    try {
        if(slug){
            entity = await getPages(slugQuery);
            //console.log('apidata res:', entity, `slug=${slug}`)
            responseData.success = true
            responseData.page =  await filterEntity(entity[0]);
        }
        
    }catch(error){
        responseData.error = error.message
    }
   //console.log('apidata res:', {responseData})
    return Response.json({ responseData });
}

export async function getAllPageData(queries) {
    //console.log(`in page api !:`)
    //const { searchParams } = new URL(request.url)
    //const order = 'desc'
    //const per_page = searchParams.get('per_page') || 99

    //Queries
    //const orderQuery = `order=${order}&`
    //const perPageQuery = `per_page=${per_page}&`


    let entities
    const responseData = {
        success: false,
        pages: []
    };
    

    try {

        

        //Get pages
        const data = await getPages(queries);
        //console.log('api all pages:', data)
        
        entities = data
        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterEntity(entities[i]);
            //console.log('entities pages:', entities)
        }
        
        responseData.success = true
        responseData.pages =  entities
        //console.log('api all pages:', responseData)
        
        
    }catch(error){
        responseData.error = error.message
    }
    //console.log('respos pages:', responseData)
    return Response.json({ responseData });
}