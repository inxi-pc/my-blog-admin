import API from 'app_lib/api.js'

class CategoryModel {
    constructor() {
        // @primary key
        this.category_id = null;
        this.category_parent_id = null;
        this.category_root_id = null;
        // @unique
        this.category_name_en = null;
        this.category_name_cn = null;
        this.category_level = null;
        this.category_created_at = null;
        this.category_updated_at = null;
        this.category_enabled = null;
    }
}

export default class Category extends API {
    constructor() {
        super();
        this.apiGateway += "/categories/";
    }

    /**
     * 
     * @return Promise
     */
    getCategoryById(vue, categoryId) {
        var url = this.apiGateway + categoryId;

        return vue.$http.get(url);
    }

    /**
     * 
     * @return Promise
     */
    getCategoriesByIds(vue, categoryIds) {
        return this.getCategories(categoryIds);
    }

    /**
     * 
     * @return Promise
     */
    getCategoriesByCondition(vue, conditions) {
        return this.getCategories(vue, conditions);
    }

    /**
     * @return Promise
     */
    getCategoryList(vue, conditions, page, order) {
        var params = this.mergeParams(conditions, page, order);
        var url = this.apiGateway + 'list';

        return  vue.$http.get(url, {
            params: params
        });
    }

    getCategories(vue, conditions) {
        var params = this.mergeParams(conditions);

        return vue.$http.get(this.apiGateway, {
            params: params
        });
    }
}
