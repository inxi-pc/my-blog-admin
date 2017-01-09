<style src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped>
    .content-box-header {
        min-height: 40px;
        font-size: 16px;
        background:#f5f5f5;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        padding:10px;
        border-left:1px solid #ddd;
        border-top:1px solid #ddd;
        border-right:1px solid #ddd;
    }

    .content-box-header:after {
        clear:both;
    }

    .panel-heading > .panel-title {
        float: left;
        padding: 10px 15px 10px 0px;
        padding-top: 0px;
    }

    .content-box-large {
        margin-bottom: 30px;
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        border-left: 1px solid #ddd;
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    .box-with-header {
        border-top: none;
        border-top-left-radius:0px;
        border-top-right-radius:0px;
    }
</style>

<template>
    <div class="panel-default">
        <div class="content-box-header panel-heading">
            <div class="panel-title">Category Create</div>
        </div>
        <div class="content-box-large box-with-header">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label for="selectCategoryParentId" class="col-sm-2 control-label">Parent Category</label>
                    <div class="col-sm-5">
                        <select v-on:change="changeCategoryParentId" type="text" class="form-control" id="selectCategoryParentId">
                            <option>Select</option>
                            <option v-for="category in categoryParentList" value='{{ category.category_id }}'>
                                (level: {{ category.category_level }}) {{ category.category_name_en }} ({{ category.category_name_cn }})
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputCategoryNameEn" class="col-sm-2 control-label">Category Name EN</label>
                    <div class="col-sm-5">
                        <div class="input-group">
                            <input v-on:change="changeCategoryNameEn" type="text" class="form-control" id="inputCategoryNameEn">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-remove-circle" style="display:none"></i>
                            </span>
                        </div>
                        <span class="help-block" style="display:none">
                            <i class="fa fa-warning"></i>error
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputCategoryNameCn" class="col-sm-2 control-label">Category Name CN</label>
                    <div class="col-sm-5">
                        <div class="input-group">
                            <input v-on:change="changeCategoryNameCn" type="text" class="form-control" id="inputCategoryNameCn">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-remove-circle" style="display:none"></i>
                            </span>
                        </div>
                        <span class="help-block" style="display:none">
                            <i class="fa fa-warning"></i>error
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" class="btn btn-primary" v-on:click="createCategory">Create</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Pagination from 'app_api/pagination.js'
import Sort from 'app_api/sort.js'
import Category from 'app_api/category.js'
import { CategoryModel } from 'app_api/category.js'

export default {
    data: function () {
        return {
           category: new CategoryModel(),
           categoryParentList: []
        };
    },

    route: {
        data: function () {
            // Get category parent list
            var page = new Pagination(0, 20);
            var sort = new Sort("DESC", "category_id", "category_id");
            var query = new CategoryModel();
            query.category_enabled = true;
            new Category().getCategoryList(this, query, page, sort).then((response) => {
                this.categoryParentList = response.body.data;
            }, (response) => {
                console.log(response);
            });
        }
    },

    methods: {
        changeCategoryParentId: function (e) {
            this.category.category_parent_id = $(e.target).val();
        },

        changeCategoryNameEn: function (e) {
            this.category.category_name_en = $(e.target).val();
        },

        changeCategoryNameCn: function (e) {
            this.category.category_name_cn = $(e.target).val();
        },

        createCategory: function (event) {
            new Category().createCategory(this, this.category).then((response) => {
                this.refreshPage();
            }, (response) => {
                console.log(response);
            });
        }
    }
}
</script>
