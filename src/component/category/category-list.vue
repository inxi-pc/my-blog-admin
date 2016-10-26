<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="datatables_bootstrap/css/dataTables.bootstrap.css"></style>
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
            <table id="postList" cellpadding="0" cellspacing="0" border="0"
            class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>User ID</th>
                        <th>Category ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Published</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Category from 'app_api/category.js'
import { CategoryModel } from 'app_api/category.js'

export default {
    data: function () {
        return {
            categories: []
        }
    },

    ready: function () {
        this.bindElementAction();
    },

    methods: {
        bindElementAction: function () {
            
        }
    }
}
</script>
