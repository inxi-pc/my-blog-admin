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
import Order from 'app_api/order.js'
import Post from 'app_api/post.js'
import { PostModel } from 'app_api/post.js'

import "datatables_bootstrap/js/dataTables.bootstrap.js"
import "datatables/media/js/jquery.dataTables.js"

export default {
    data: function () {
        return {
            posts: [],
            // pagination
            orderType: "DESC",
            orderBy: "post_id",
            limit: 10,
            offset: 0,
            total: 0
        }
    },

    ready: function () {
        var page = new Pagination(this.offset, this.limit);
        var order = new Order(this.orderType, this.orderBy, "post_id");
        var context = this;

        $('#postList').dataTable({
            response: true,
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: new Post().apiGateway + 'list',
                data: {
                    limit: page.limit,
                    offset: page.offset,
                    order_by: order.orderBy,
                    order_type: order.orderType
                }
            },
            columns: [
                {'data': 'post_id'},
                {'data': 'user_id'},
                {'data': 'category_id'},
                {'data': 'post_title'},
                {'data': 'post_content'},
                {'data': 'post_created_at'},
                {'data': 'post_updated_at'},
                {'data': 'post_published'}
            ],
            columnDefs: [ {
                targets: [8],
                data: 'post_id',
                orderMulti: false,
                render: function ( data, type, full, meta ) {
                    return '<a href="/dist/post-edit.html?post_id='+ data +'">Edit</a>' + '&nbsp'
                            + '<a data-published="' + full.post_published 
                            + '" data-id="' + data + '" href="javascript:;" class="published">Published</a>' + '&nbsp'
                            + '<a data-id="' + data + '" href="javascript:;" class="delete">Delete</a>';
                }
            }]
        });

        $('#postList').on("order.dt", function () {
            console.log('orders');
        });

        $('#postList').on('preXhr.dt', function (e, settings, data) {
            console.log('pre preXhr');
            var api = new $.fn.dataTable.Api(settings);
            var orderInfo = api.order();
            var columnIndex = orderInfo[0][0];
            var orderType = orderInfo[0][1];
            var columnProp = api.column(columnIndex).dataSrc();
            data.order_by = columnProp;
            data.order_type = orderType;
            console.log(orderType);
        });

        $('#postList').on('xhr.dt', function (e, settings, json, xhr) {
            console.log('xhr finished');
            console.log(json);
            json.recordsFiltered = json.recordsTotal;
            var api = new $.fn.dataTable.Api(settings);
            api.page.len(page.limit);
        });

        $('#postList').on('preInit.dt', function (e, settings) {
            console.log('pre init');
        });

        this.bindElementAction();
    },

    methods: {
        bindElementAction: function () {
            var context = this;
            // bind publish action
            $('.published').each(function (i, element) {
                $(element).on('click', function (e) {
                    var postId = $(element).data('id');
                    var published = $(element).data('published');
                    context.publishedPost(postId, published);
                });
            });

            $('.delete').each(function (i, element) {
                $(element).on('click', function (e) {
                    var postId = $(element).data('id');
                    context.deletePost(postId);
                });
            });
        },

        publishedPost: function (postId, published) {
            var post = new PostModel();
            post.post_published = !published;
            new Post().updatePost(this, postId, post).then((response) => {
                
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
