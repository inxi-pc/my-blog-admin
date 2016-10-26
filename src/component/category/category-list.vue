<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="datatables_bootstrap/css/dataTables.bootstrap.css"></style>
<style src="jquery_fancytree/dist/skin-bootstrap/ui.fancytree.css"></style>
<style>
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

    .panel-heading > .action > a {
        font-size: 12px;
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

    tr, td {
        font-size: 12px;
    }
</style>

<template>
    <div class="panel-default">
        <div class="content-box-header panel-heading">
            <div class="panel-title">Category List</div>
            <div class="action">
                <a href="/dist/category-create.html">Create Category</a>
            </div>
        </div>
        <div class="content-box-large box-with-header">
            <div id="categoryTree"></div>
        </div>
    </div>
</template>

<script>
import "jquery_fancytree/dist/src/jquery.fancytree.js"

import Pagination from 'app_api/pagination.js'
import Sort from 'app_api/sort.js'
import Category from 'app_api/category.js'
import { CategoryModel } from 'app_api/category.js'

export default {
    data: function () {
        return {
            categories: [],
            // pagination
            orderType: "desc",
            orderBy: "category_id",
            limit: 10,
            offset: 0,
            total: 0
        }
    },

    ready: function () {
        var page = new Pagination(this.offset, this.limit);
        var sort = new Sort(this.orderType, this.orderBy, "category_id");
        var context = this;

        new Category().getCategoryList(this, null, page, sort).then((response) => {
            context.categories = response.body.data;
            context.bindElementAction();
        }, (response) => {
            console.log(response);
        });
    },

    methods: {
        bindElementAction: function () {
            $("#categoryTree").fancytree({
                source: this.categories
            })
        }
    }
}
</script>
