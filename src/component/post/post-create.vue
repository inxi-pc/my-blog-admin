<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="tinymce/skins/lightgray/skin.min.css"></style>
<style src="tinymce/skins/lightgray/content.min.css"></style>
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
            <div class="panel-title">Post Create</div>
        </div>
        <div class="content-box-large box-with-header">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label for="selectCategoryId" class="col-sm-2 control-label">Category</label>
                    <div class="col-sm-5">
                        <select type="text" class="form-control" id="selectCategoryId">
                            <option></option>
                            <option v-for="category in categoryList" value='{{ category.category_id }}'>
                                {{ category.category_name_en }} ({{ category.category_name_cn }})
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputPostTitle" class="col-sm-2 control-label">Post title</label>
                    <div class="col-sm-5">
                        <div class="input-group">
                            <input type="text" class="form-control" id="inputPostTitle">
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
                    <label for="inputPostContent" class="col-sm-2 control-label">Post Content</label>
                    <div class="col-sm-10">
                        <textarea id="inputPostContent"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="checkboxPublished">Published now?
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" class="btn btn-primary"
                        v-on:click="createPost">Create</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/advlist/plugin'
import 'tinymce/plugins/autolink/plugin'
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/image/plugin'
import 'tinymce/plugins/charmap/plugin'
import 'tinymce/plugins/print/plugin'
import 'tinymce/plugins/preview/plugin'
import 'tinymce/plugins/anchor/plugin'
import 'tinymce/plugins/searchreplace/plugin'
import 'tinymce/plugins/visualblocks/plugin'
import 'tinymce/plugins/code/plugin'
import 'tinymce/plugins/fullscreen/plugin'
import 'tinymce/plugins/insertdatetime/plugin'
import 'tinymce/plugins/media/plugin'
import 'tinymce/plugins/table/plugin'
import 'tinymce/plugins/contextmenu/plugin'
import 'tinymce/plugins/paste/plugin'
import 'tinymce/plugins/emoticons/plugin'
import 'tinymce/plugins/template/plugin'
import 'tinymce/plugins/textcolor/plugin'

import { PostModel } from 'app_api/post.js'
import Post from 'app_api/post.js'

import Pagination from 'app_api/pagination.js'
import Order from 'app_api/order.js'
import Category from 'app_api/category.js'

export default {
    data: function () {
        var post = new PostModel();
        post.user_id = 1;
        return {
           post: post,
           categoryList: []
        };
    },

    ready: function () {
        this.initialEditor();
         // Get category list
        var page = new Pagination(this.offset, this.limit);
        var order = new Order(this.orderType, this.orderBy, "category_id");
        new Category().getCategories(this, page, order).then((response) => {
            this.categoryList = response.body;
        }, (response) => {
            console.log(response);
        });

        this.bindElementAction();
    },

    methods: {
        initialEditor: function () {
            var context = this;
            tinymce.remove();
            tinymce.init({
                selector: "#inputPostContent",
                skin: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table contextmenu paste",
                    "emoticons template textcolor"
                ],
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                setup: function (editor) {
                    editor.on("change", function (e) {
                        context.post.post_content = editor.getContent();
                    });
                }
            });
        },

        bindElementAction: function () {
            var categoryIdElement = $("#selectCategoryId");
            var postTitleElement = $("#inputPostTitle");
            var postPublishedElement = $("#checkboxPublished");
            var context = this;

            categoryIdElement.on("change", function (e) {
                context.post.category_id = $(e.target).val();
            });

            postTitleElement.on("change", function (e) {
                context.post.post_title = $(e.target).val();
            });

            postPublishedElement.on("change", function (e) {
                context.post.post_published = $(e.target).prop('checked');
            });
        },

        createPost: function (event) {
            console.log(this.post);
            new Post().createPost(this, this.post).then((response) => {

            }, (response) => {

            });
        }
    }
}
</script>
