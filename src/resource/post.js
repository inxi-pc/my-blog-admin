export default class Post {

    constructor(vue) {
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
        this.post_deleted_at = "";

        // addtional business field
        this.user_name = "";
        this.category_name = "";
    }

    static getPostById(vue, postId) {
        return this.getPost(postId);
    }

    static getPost(vue, postId) {
        var post = new Post();
        post.post_id = 1;
        post.user_id = 1;
        post.category_id = 1;
        post.post_title = "This is test";
        post.post_content = "Test content, fuck your github";
        post.post_created_at = "2010-03-04 12:00:00";
        post.post_updated_at = "2010-03-14 22:00:00";

        post.user_name = "xiong";
        post.category_name = "Javascript";

        return post;
    }

    static getPostsByIds(vue, postIds, page, order) {
        return this.getPosts(postIds, page, order);
    }

    static getPostsByCategory(vue, categoryId, page, order) {
        return this.getPosts(categoryId, page, order);
    }

    static getPostsByUser(vue, userId, page, order) {
        return this.getPosts(userId, page, order);
    }

    static getPosts(vue, condition, page, order) {
        return vue.$http.get('http://localhost:8888/posts/', {
            params: {
                orderBy: order.orderBy,
                orderType: order.orderType,
                limit: page.limit,
                offset: page.offset
            }
        });
    }
}
