import API from 'app_lib/api.js'

class CategoryModel {
    constructor() {
        // @primary key
        this.category_id = null;
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

    getCategoryById(vue, categoryId) {
        return this.getCategory(vue, categoryId);
    }

    /**
     * @return Promise
     */
    getCategory(vue, condition) {
        var params = this.mergeParams(condition);

        return vue.$http.get(this.apiGateway, {
            params: params
        });
    }

    getCategoriesByIds(vue, categoryIds, page, order) {
        return this.getCategories(cIds);
    }

    /**
     * @return Promise
     */
    getCategories(vue, conditions, page, order) {
        var params = this.mergeParams(conditions, page, order);

        return  vue.$http.get(this.apiGateway, {
            params: params
        });
    }
}
