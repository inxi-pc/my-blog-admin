<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="datatables_bootstrap/css/dataTables.bootstrap.css"></style>
<style>
    .content-box-large {
        margin-bottom: 30px;
        background: #fff;
        border-radius: 10px;
        padding: 10px;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        border-right: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }

    .content-box-large {
        padding: 20px;
    }

    .panel-heading > .panel-title {
        float: left;
        padding: 10px 15px 10px 0px;
        padding-top: 0px;
    }

    .panel-heading > .panel-title > * {
        margin: 0;
    }

    .panel-heading > .panel-title > span {
        font-weight: normal;
    }

    .panel-body {
        clear: both;
    }

    #postList tr, 
    #postList td {
        font-size: 12px;
    }
</style>

<template>
    <div class="content-box-large">
        <div class="panel-heading">
            <div class="panel-title">Post List</div>
            <div>
                <a href="/dist/post-create.html">Create Post</a>
            </div>
        </div>
        <div class="panel-body">
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
                        <th>Enabled</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts">
                        <td>{{ post.post_id }}</td>
                        <td>{{ post.user_id }}</td>
                        <td>{{ post.category_id }}</td>
                        <td>{{ post.post_title }}</td>
                        <td>{{ post.post_content }}</td>
                        <td>{{ post.post_created_at }}</td>
                        <td>{{ post.post_updated_at }}</td>
                    </tr>
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

        new Post().getPosts(this, null, page, order).then((response) => {
            $('#postList').dataTable({
                scrollX: true,
                response: true,
                columns: [
                    {'data': 'post_id'},
                    {'data': 'user_id'},
                    {'data': 'category_id'},
                    {'data': 'post_title'},
                    {'data': 'post_content'},
                    {'data': 'post_created_at'},
                    {'data': 'post_updated_at'},
                    {'data': 'post_published'},
                    {'data': 'post_enabled'}
                ],
                columnDefs: [ {
                    targets: [9],
                    data: 'post_id',
                    render: function ( data, type, full, meta ) {
                        return '<a href="/dist/post-edit.html?post_id='+ data +'">Edit</a>' + '&nbsp'
                                + '<a data-id="' + data + '" href="javascript:;" class="published">Published</a>';
                    }
                }],

                // pagination
                pageLength: page.limit,
                displayStart: page.offset,
                order: [0, page.orderType],

                data: response.body
            });

            this.bindElementAction();
        }, (response) => {
            console.log(response);
        });

    },

    methods: {
        bindElementAction: function () {
            // bind publish action
            $('.published').each(function (i, element) {
                $(element).on('click', function (e) {
                    var postId = $(element).data('id');
                    this.publishedPost(postId);
                });
            });
        },

        publishedPost: function (postId) {
            var post = new PostModel();
            post.post_published = true;
            post.post_id = postId;
            console.log(post);
            new Post().updatePost(this, postId, post).then((response) => {
                
            }, (response) => {
                console.log(response);
            });
        }
    }
}
</script>
