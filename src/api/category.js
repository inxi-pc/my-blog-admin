import API from 'app_lib/api.js'

class CategoryModel {
    constructor() {
        // @primary key
        this.dategory_id = 0;
        // @unique
        this.category_name = "";
        this.category_created_at = "";
        this.category_updated_at = "";
        this.category_deleted_at = "";
        // addtional business field
        this.post_count = 0;
    }
}

export default class Category extends API {
    constructor() {
        super();
        this.apiGateway += "/categories/";
    }

    static getCategoryById(cId) {
        return this.getCategory(cId);
    }

    static getCategoryByName(cName) {
        return this.getCategory(cName);
    }

    static getCategory(cond) {
        var category = new CategoryModel();
        category.category_id = 1;
        category.category_name = "Javascript";
        category.category_created_at = "2010-03-04 12:00:00";
        category.category_updated_at = "2010-03-14 22:00:00";
        category.post_count = 1;

        return category;
    }

    static getCategoriesByIds(cIds, order, by, limit) {
        return this.getCategories(cIds);
    }

    static getCategoriesNewest(order, by, limit) {
        return this.getCategories();
    }

    static getCategories(cond, order = "DESC", by = "category_id", limit = 0) {
        var categories = [];
        categories.push(this.getCategory(0));

        return categories;
    }
}
