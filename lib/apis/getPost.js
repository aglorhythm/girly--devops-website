
import { getSingleArticle, getArticles, getBlogCategories, getMedias } from '/lib/apis';

/**
 * Retieve article featured image url
 * @param {*} id 
 * @returns 
 */
async function getFeaturedMedia(id) {
    const media = await getMedias(id);
    const url = media.source_url


    if (media && media.id == id) {
        return url
    }
}

/**
 * Retieve article featured image url
 * @param {*} categoryIds 
 * @returns 
 */
async function getCategory(categoryIds) {
    const queries = `include=${categoryIds.join(',')}`
    const categories = await getBlogCategories(queries ? `?${queries}` : '');
    return categories.map(category => ({ name: category.name }));
}

/**
 * Filter entity for post api fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntity(entity) {

    const featuredMediaLink = await getFeaturedMedia(entity.featured_media);

    let categoriesData = [];
    let categories = entity.categories;

    if (entity.categories) {
        // const categoryPromises = categories.map(categoryId => getCategory(categoryId));

        const category = await getCategory(categories);
        categoriesData = category
    }
    const language = entity.tags.map(tag => {
        if (tag === 36) {
            return 'en'
        }

        if (tag === 35) {
            return 'fr'
        }

        if (tag !== 35 || tag !== 36) {
            return 'fr'
        }
    })

    return {
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
        featured_media: featuredMediaLink,
        categories: categoriesData,
        meta_data: {
            title: entity.acf.meta_title,
            description: entity.acf.meta_description,
            language: entity.acf.language,
            song: entity.acf.song_id
        },
        language: language[0]

        /*meta_data: {
            title: {
                en: entity.acf.meta_title_en,
                fr: entity.acf.meta_title_fr,
            },

        description: {
                en: entity.acf.meta_description_en,
                fr: entity.acf.meta_description_fr,
        }
        },*/
        //language: entity.acf.language,
    }
}

/**
 * Filter entity for post api fields
 * @param {*} entity 
 * @returns 
 */
async function filterLastEntity(entity, params) {
    
    const featuredMediaLink = await getFeaturedMedia(entity.featured_media);

    let categoriesData = [];
    let categories = entity.categories;

    if (entity.categories) {
        // const categoryPromises = categories.map(categoryId => getCategory(categoryId));

        const category = await getCategory(categories);
        categoriesData = category
    }
    const language = entity.tags.map(tag => {
        if (tag === 36) {
            return 'en'
        }

        if (tag === 35) {
            return 'fr'
        }

        if (tag !== 35 || tag !== 36) {
            return 'fr'
        }
    })


    return {
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
        featured_media: featuredMediaLink,
        categories: categoriesData,
        meta_data: {
            title: entity.acf.meta_title,
            description: entity.acf.meta_description,
            language: entity.acf.language
        },
        language: language[0]
    }
}

/**
 * Filter entity for category api fields
 * @param {*} entity 
 * @returns 
 */
async function filterEntityCateg(entity) {

    return {
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        description: entity.description,
    }
}

export async function getPostData(slug) {

    //console.log('in sigle article api !', slug)
    //Queries
    const slugQuery = `?slug=${slug}`;

    let entity
    const responseData = {
        success: false,
        article: [],
        total_items: null,
        total_pages: null
    };


    try {


        if (slug) {
            entity = await getSingleArticle(slug);
            responseData.success = true
            responseData.article = await filterEntity(entity[0]);
        }

    } catch (error) {
        console.log('err serveur:', error)
        responseData.error = error.message
    }
    //console.log('apidata res post:', {responseData})
    return Response.json({ responseData });
}

export async function getAllPostsData(queries) {
   // console.log('in fetch all posts:', queries)
    let entities
    const responseData = {
        success: false,
        articles: []
    };



    try {

        //Get last blog posts
        const data = await getArticles(queries);
        entities = data
        for (var i = 0; i < entities.length; i++) {
            entities[i] = await filterEntity(entities[i]);
        }
        responseData.success = true
        responseData.articles = entities
        responseData.total_items = data.headers["x-wp-total"];
        responseData.total_pages = data.headers["x-wp-totalpages"];
    } catch (error) {
        responseData.error = error.message
    }
    return Response.json({ responseData });
}

export async function getLastPostData(params) {

    //console.log('params in getLastPostData:', params)
    const order ='desc';
    const per_page = 4;
    const queries = `order=${order}&per_page=${per_page}`
    //console.log('in fetch all posts:', params.lang)
    
    let entities
    const responseData = {
        success: false,
        articles: []
    };



    try {

        //Get last blog posts
        const data = await getArticles(queries);
        entities = data
        for (var i = 0; i < entities.length; i++) {
            entities[i] = await filterLastEntity(entities[i], params);
            
        }
        const filteredEntities = entities.filter(entity => entity.language == params.lang)

        responseData.success = true
        responseData.articles = filteredEntities
    } catch (error) {
        responseData.error = error.message
    }
    return Response.json({ responseData });
}

export async function getCategoriesData(queries) {

    let entities
    const responseData = {
        success: false,
        categories: []
    };


    try {

        //Get categories
        //console.log('categ request queries:', queries)
        const data = await getBlogCategories(queries ? `?${queries}` : '');
        //console.log('categ request:', data)


        entities = data
        for (var i = 0; i < entities.length; i++) {
            entities[i] = await filterEntityCateg(entities[i]);
        }

        responseData.success = true
        responseData.categories = entities


    } catch (error) {
        responseData.error = error.message
    }
    //console.log('respos categ:', responseData)

    return Response.json({ responseData });
}