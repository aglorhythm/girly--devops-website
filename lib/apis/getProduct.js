import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const consumerKey = process.env.WC_CLIENT_KEY;
const consumerSecret = process.env.WC_SK;
const publicApiUrl = process.env.API_URL_PUBLIC;


const api = new WooCommerceRestApi({
  url: publicApiUrl,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  version: "wc/v3",
  axiosConfig:{
    headers:{
      "Content-Type": "application/json;charset=UTF-8"
      }
  }
});

/**
 * Filter product fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntity(entity){
    //Price  Id
    const priceIdObject = entity.meta_data.find(item => item.key === 'price_id');
    const priceIdValue = priceIdObject ? priceIdObject.value : null;


     //Titles
     const titleFr = entity.meta_data.find(item => item.key === 'title_fr');
     const titleFrValue = titleFr ? titleFr.value : null;
 
     const titleEn = entity.meta_data.find(item => item.key === 'title_en');
     const titleEnValue = titleEn ? titleEn.value : null;
    
    
    return{
        id: entity.id,
       name: {
            fr: titleFrValue,
            en: titleEnValue
        },
        permalink: entity.permalink,
        slug:entity.slug,
        description: entity.description,
        modified: entity.date_modified,
        short_description: entity.short_description,
        description_en: entity.description_en,
        short_description_en: entity.short_description_en,
        price: entity.price,
        price_id: priceIdValue,
        sale_price: entity.sale_price,
        dimensions: entity.dimensions,
        categories: entity.categories.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
        })),
        featured_image: entity.images && {
            id: entity.images[0].id,
            src: entity.images[0].src,
            alt: entity.images[0].alt,
        },
        related_products: entity.related_ids,
        attributes: entity.attributes,
    }
}

/**
 * For single product page
 * @param {*} entity 
 * @returns 
 */
async function filterFullEntity(entity){

    //Price  Id
    const priceIdObject = entity.meta_data.find(item => item.key === 'price_id');
    const priceIdValue = priceIdObject ? priceIdObject.value : null;


    //Metadata
    const metadataTitleFr = entity.meta_data.find(item => item.key === 'meta_title_fr');
    const metadataTitleFrValue = metadataTitleFr ? metadataTitleFr.value : null;

    const metadataTitleEn = entity.meta_data.find(item => item.key === 'meta_title_en');
    const metadataTitleEnValue = metadataTitleEn ? metadataTitleEn.value : null;


    const metadataDescriptionEn = entity.meta_data.find(item => item.key === 'meta_description_en');
    const metadataDescriptionEnValue = metadataDescriptionEn ? metadataDescriptionEn.value : null;

    const metadataDescriptionFr = entity.meta_data.find(item => item.key === 'meta_description_fr');
    const metadataDescriptionFrValue = metadataDescriptionFr ? metadataDescriptionFr.value : null;

    //Descriptions

    const descriptionFr = entity.meta_data.find(item => item.key === 'description_fr');
    const descriptionFrValue = descriptionFr ? descriptionFr.value : null;

    const descriptionEn = entity.meta_data.find(item => item.key === 'description_en');
    const descriptionEnValue = descriptionEn ? descriptionEn.value : null;

    const shortDescriptionFr = entity.meta_data.find(item => item.key === 'short_description_fr');
    const shortDescriptionFrValue = shortDescriptionFr ? shortDescriptionFr.value : null;

    const shortDescriptionEn = entity.meta_data.find(item => item.key === 'short_description_en');
    const shortDescriptionEnValue = shortDescriptionEn ? shortDescriptionEn.value : null;


    //Titles
    const titleFr = entity.meta_data.find(item => item.key === 'title_fr');
    const titleFrValue = titleFr ? titleFr.value : null;

    const titleEn = entity.meta_data.find(item => item.key === 'title_en');
    const titleEnValue = titleEn ? titleEn.value : null;

    //Materials
    const materialsFr = entity.meta_data.find(item => item.key === 'materials_fr');
    const materialsFrValue = materialsFr ? materialsFr.value : null;

    const materialsEn = entity.meta_data.find(item => item.key === 'materials_en');
    const materialsEnValue = materialsEn ? materialsEn.value : null;


    //Sizes
    //Materials
    const sizesFr = entity.meta_data.find(item => item.key === 'size_fr');
    const sizesFrValue = sizesFr ? sizesFr.value : null;

    const sizesEn = entity.meta_data.find(item => item.key === 'size_en');
    const sizesEnValue = sizesEn ? sizesEn.value : null;

    //console.log('entity:', entity)
    return{
        id: entity.id,
        name: {
            fr: titleFrValue,
            en: titleEnValue
        },
        permalink: entity.permalink,
        slug:entity.slug,
        description: {
            fr: descriptionFrValue,
            en: descriptionEnValue
        },
        short_description: {
            fr: shortDescriptionFrValue,
            en: shortDescriptionEnValue
        },
        price: entity.price,
        sale_price: entity.sale_price,
        price_id: priceIdValue,
        dimensions: entity.dimensions,
        categories: entity.categories && entity.categories.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
        })),
        featured_image: entity.images ? {
            id: entity.images[0].id,
            src: entity.images[0].src,
            alt: entity.images[0].alt,
        } : undefined,
        gallery: entity.images && entity.images.map(image => ({
            id: image.id,
            name: image.name,
            slug: image.slug,
            src: image.src
        })),
        related_products: entity.related_ids,
        meta_data: {
            title: {
                fr: metadataTitleFrValue,
                en: metadataTitleEnValue,
            },
            description: {
                fr: metadataDescriptionFrValue,
                en: metadataDescriptionEnValue
            },
            materials:
            {
                fr: materialsFrValue,
                en: materialsEnValue,
            },
            sizes:
            {
                fr: sizesFrValue,
                en: sizesEnValue,
            },
        }

    }
}

/**
 * Filter entity fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntityCateg(entity){

    return{
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        description: entity.description,
    }
}

export async function getProductData(slug) {
    
    let entity
    const responseData = {
        success: false,
        product: []
    };

    try {
        
        if(slug){
            entity = await api.get(
                `products`,
                {
                    slug: slug
                }
            );
            
            responseData.success = true
            responseData.product =  await filterFullEntity(entity.data[0]);
            //console.log('entity:', responseData.product)
        }
    }catch(error){
        //console.log('err:', error)
        responseData.error = error.message
    }
    //console.log('apidata res product:', {responseData})
    return Response.json({ responseData });
}

export async function getAllProductsData(queries) {
    queries.per_page =  12
    queries.status =  'publish'
   //console.log(' in api getAllProductsData:', queries)
    let entities
    const responseData = {
        success: false,
        products: [],
        total_items: null,
        total_pages: null
    };

    try {
        const data = await api.get(
            'products',
            queries
        );
        
        entities = data.data;

        //console.log('productsss server:', entities)

        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterEntity(entities[i]);
        }
        
        responseData.success = true;
        responseData.products =  entities;
        responseData.total_items =  data.headers["x-wp-total"];
        responseData.total_pages =  data.headers["x-wp-totalpages"];
        
    }catch(error){
        console.log('err:', error)
        responseData.error = error.message
    }
    console.log('productsss res fetch:', responseData)
    return Response.json({ responseData });
}

export async function getAllProductsDataFeed(queries) {
    queries.per_page =  12
   //console.log(' in api getAllProductsData:', queries)
    let entities
    const responseData = {
        success: false,
        products: [],
        total_items: null,
        total_pages: null
    };

    try {
        const data = await api.get(
            'products',
            queries
        );
        
        entities = data.data;

        //console.log('productsss server:', entities)

        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterFullEntity(entities[i]);
        }
        
        responseData.success = true;
        responseData.products =  entities;
        responseData.total_items =  data.headers["x-wp-total"];
        responseData.total_pages =  data.headers["x-wp-totalpages"];
        
    }catch(error){
        //console.log('err:', error)
        responseData.error = error.message
    }
    //console.log('productsss res fetch:', responseData)
    return Response.json({ responseData });
}

export async function getLastProductsData() {
    
   //console.log(' in api getAllProductsData:', queries)
    let entities
    const responseData = {
        success: false,
        products: [],
        total_items: null,
        total_pages: null
    };

    try {
        const data = await api.get(
            'products',
            {
                order: 'desc',
                per_page: 3
            }
        );
        
        entities = data.data;

        //console.log('productsss server:', entities)

        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterEntity(entities[i]);
        }
        
        responseData.success = true;
        responseData.products =  entities;
        responseData.total_items =  data.headers["x-wp-total"];
        responseData.total_pages =  data.headers["x-wp-totalpages"];
        
    }catch(error){
        
        responseData.error = error.message
        console.log('err:', error)
    }
    //console.log('productsss res fetch:', responseData)
    return Response.json({ responseData });
}

export async function getCategoriesData() {
    //console.log(' in api getCategoriesData:')
    let entities
    const responseData = {
        success: false,
        categories: []
    };
    

    try {

        //Get 3 last blog post
        const data = await api.get("products/categories");
        entities = data.data

        for(var i = 0; i < entities.length; i++){
            entities[i] = await filterEntityCateg(entities[i]);
        }
        
        responseData.success = true
        responseData.categories =  entities
        
        
    }catch(error){
        responseData.error = error.message
    }
    //console.log('respos product categ:', responseData)
    return Response.json({ responseData });
}