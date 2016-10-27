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
        // Todo get session user id
        post.user_id = 1;
        return vue.$http.post(this.apiGateway, post);
    }

    /**
     * 
     * @return Promise
     */
    updatePost(vue, postId, post) {
        var url = this.apiGateway + postId;
        post.post_id = null;
        post.post_created_at = null;
        post.post_updated_at = null;
        post.post_enabled = null;

        return vue.$http.put(url, post);
    }
    
    /**
     * 
     * @return Promise
     */
    deletePost(vue, postId) {
         var url = this.apiGateway + postId;

         return vue.$http.delete(url);
    }
    
    /**
     * 
     * @return Promise
     */
    getPostById(vue, postId) {
        var url = this.apiGateway + postId;

        return vue.$http.get(url);
    }
    
    /**
     * 
     * @return Promise
     */
    getPostsByIds(vue, postIds) {
        return this.getPosts(vue, postIds);
    }

    /**
     * 
     * @return Promise
     */
    getPostsByCondition(vue, conditions) {
        return this.getPosts(vue, conditions);
    }

    /**
     * 
     * @return Promise
     */
    getPostList(vue, conditions, page, order) {
        var params = this.mergeParams(conditions, page, order);
        var url = this.apiGateway + 'list';

        return vue.$http.get(url, {
            params: params
        });
    }

    /**
     * 
     * @return Promise
     */
    getPosts(vue, conditions) {
        var params = this.mergeParams(conditions);

        return vue.$http.get(this.apiGateway, {
            params: params
        });
    }
}
