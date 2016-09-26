import API from 'app_lib/api.js'

class PostModel {
    constructor() {
        // @primary key
        this.post_id = 0;
        // @reference
        this.user_id = 0;
        // @reference
        this.category_id = "";
        this.post_title = "";
        this.post_content = "";
        this.post_created_at = "";
        this.post_updated_at = "";
        this.post_published = "";
        this.post_enabeld = "";
    }
}

export default class Post extends API {
    constructor() {
        super();
        this.apiGateway  += '/posts/';
    }

    getPostById(vue, postId) {
        return this.getPost(vue, postId);
    }

    getPost(vue, postId) {
        return vue.$http.get(this.apiGateway, {
            params: {
                postId: postId
            }
        });
    }

    getPostsByIds(vue, postIds, page, order) {
        return this.getPosts(postIds, page, order);
    }

    getPostsByCategory(vue, categoryId, page, order) {
        return this.getPosts(categoryId, page, order);
    }

    getPostsByUser(vue, userId, page, order) {
        return this.getPosts(userId, page, order);
    }

    getPosts(vue, condition, page, order) {
        return vue.$http.get(this.apiGateway, {
            params: {
                orderBy: order.orderBy,
                orderType: order.orderType,
                limit: page.limit,
                offset: page.offset
            }
        });
    }
}
