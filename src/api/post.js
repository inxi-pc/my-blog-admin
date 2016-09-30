import API from 'app_lib/api.js'
import * as Helper from 'app_lib/helper.js'

class PostModel {
    constructor() {
        // @primary key
        this.post_id = null;
        // @reference
        this.user_id = null;
        // @reference
        this.category_id = null;
        this.post_title = null;
        this.post_content = null;
        this.post_created_at = null;
        this.post_updated_at = null;
        this.post_published = null;
        this.post_enabled = null;
    }
}

export { PostModel }

export default class Post extends API {
    constructor() {
        super();
        this.apiGateway  += '/posts/';
    }

    /**
     * 
     * @return Promise
     */
    createPost(vue, post) {
        return vue.$http.post(this.apiGateway, post);
    }

    /**
     * 
     * @return Promise
     */
    updatePost(vue, postId, post) {
        return vue.$http.put(this.apiGateway + postId, post);
    }

    getPostById(vue, postId) {
        return this.getPost(vue, postId);
    }
    
    /**
     * 
     * @return Promise
     */
    getPost(vue, postId, condition) {
        var params = this.mergeParams(condition);
        var url = Helper.isNullOrEmpty(postId) ? this.apiGateway : this.apiGateway + postId;
        return vue.$http.get(url, params);
    }

    getPostsByIds(vue, postIds, page, order) {
        return this.getPosts(postIds, page, order);
    }

    /**
     * 
     * @return Promise
     */
    getPosts(vue, conditions, page, order) {
        var params = this.mergeParams(conditions, page, order);
            
        return vue.$http.get(this.apiGateway, {
            params: params
        });
    }
}
