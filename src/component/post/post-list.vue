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
            <div class="panel-title">Post List</div>
            <div class="action">
                <a href="/dist/post-create.html">Create Post</a>
            </div>
        </div>
        <div class="content-box-large box-with-header">
            <table id="postList" cellpadding="0" cellspacing="0" border="0"
            class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Select</th>
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
import Pagination from 'app_api/pagination.js'
import Sort from 'app_api/sort.js'
import Post from 'app_api/post.js'
import Auth from 'app_api/auth.js'
import { PostModel } from 'app_api/post.js'

import "datatables_bootstrap/js/dataTables.bootstrap.js"
import "datatables/media/js/jquery.dataTables.js"

export default {
    data: function () {
        return {
            posts: [],
            // pagination
            orderType: "desc",
            orderBy: "post_id",
            limit: 10,
            offset: 0,
            total: 0
        }
    },

    ready: function () {
        this.initDatatables();
    },

    methods: {
        initDatatables: function () {
            var page = new Pagination(this.offset, this.limit);
            var sort = new Sort(this.orderType, this.orderBy, "post_id");
            var context = this;
            var root = $(this.$el);
            var postApi = new Post();
            var data = {
                limit: page.limit,
                offset: page.offset,
                order_by: sort.order_by,
                order_type: sort.order_type,
                post_enabled: true
            };
            var ajax = Auth.produceAuthorizedAjaxObject(postApi.listApiGateway, null, data);

            root.find('#postList').dataTable({
                responsive: true,
                autoWidth: true,
                scrollX: true,
                processing: true,
                serverSide: true,
                ajax: ajax,
                order: [[1, sort.order_type]],
                pageLength: context.limit,
                displayStart: context.offset,
                orderMulti: false,
                columns: [
                    {'data': 'post_id'},
                    {'data': 'post_id'},
                    {'data': 'user_id'},
                    {'data': 'category_id'},
                    {'data': 'post_title'},
                    {'data': 'post_content'},
                    {'data': 'post_created_at'},
                    {'data': 'post_updated_at'},
                    {'data': 'post_published'}
                ],
                columnDefs: [
                {
                    targets: [0],
                    data: 'post_id',
                    orderable: false,
                    render: function ( data, type, full, meta ) {
                        return "<input type='checkbox'/>";
                    }
                },
                {
                    targets: [9],
                    data: 'post_id',
                    orderable: false,
                    render: function ( data, type, full, meta ) {
                        return '<a data-id="' + data + '" href="javascript:;" class="edit">Edit</a>' + '&nbsp'
                                + '<a data-published="' + full.post_published 
                                + '" data-id="' + data + '" href="javascript:;" class="published">Published</a>' + '&nbsp'
                                + '<a data-id="' + data + '" href="javascript:;" class="delete">Delete</a>';
                    }
                }]
            });

            root.find('#postList').on('preXhr.dt', function (e, settings, data) {
                console.log('pre preXhr');
                var api = new $.fn.dataTable.Api(settings);

                context.limit = api.page.len();
                context.offset = api.page() * api.page.len();

                var orderInfo = api.order();
                var columnIndex = orderInfo[0][0];
                var orderType = orderInfo[0][1];
                var columnProp = api.column(columnIndex).dataSrc();
                context.orderBy = columnProp;
                context.orderType = orderType;

                data.order_by = context.orderBy;
                data.order_type = context.orderType;
                data.limit = context.limit;
                data.offset = context.offset;
                data.post_enabled = true;
            });

            root.find('#postList').on('xhr.dt', function (e, settings, json, xhr) {
                console.log('xhr finished');
                var api = new $.fn.dataTable.Api(settings);
                json.recordsFiltered = json.recordsTotal;
            });

            root.find('#postList').on('draw.dt', function (e, settings) {
                root.find('.published').each(function (i, element) {
                    $(element).on('click', function (e) {
                        var postId = $(element).data('id');
                        var published = $(element).data('published');
                        context.publishedPost(postId, published);
                    });
                });

                root.find('.delete').each(function (i, element) {
                    $(element).on('click', function (e) {
                        var postId = $(element).data('id');
                        context.deletePost(postId);
                    });
                });

                root.find('.edit').each(function (i, element) {
                    $(element).on('click', function (e) {
                        var postId = $(element).data('id'); 
                        window.location.href = '/dist/post-edit.html?post_id=' + postId;
                    });
                })
            });
        },

        publishedPost: function (postId, published) {
            var post = new PostModel();
            post.post_published = !published;
            new Post().updatePost(this, postId, post).then((response) => {
                window.location.reload();
            }, (response) => {
                console.log(response);
            });
        },

        deletePost: function (postId) {
            new Post().deletePost(this, postId).then((response) => {
                window.location.reload();
            }, (response) => {
                console.log(response);
            });
        }
    }
}
</script>
