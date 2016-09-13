<style>
    #postList th {
        font-size: 12px
    }

    #postList td {
        font-size: 12px
    }
</style>

<template>
    <div class="content-box-large">
        <div class="panel-heading">
            <div class="panel-title">Post List</div>
            <div>
                <a v-link="{ path: '/post/create' }">Create Post</a>
            </div>
        </div>
        <div class="panel-body">
            <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="postList">
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>User ID</th>
                        <th>Category ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Created At</th>
                        <th>Updated At</th>
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
                        <td>
                            <a>Update</a>
                            <a>Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import PaginationModel from '../../resource/pagination.js'
import OrderModel from '../../resource/order.js'
import PostModel from '../../resource/post.js'

require("datatables/media/js/jquery.dataTables.js")
require("datatables_bootstrap/css/dataTables.bootstrap.css")
require("datatables_bootstrap/js/dataTables.bootstrap.js")

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
        var page = new PaginationModel(this.offset, this.limit);
        var order = new OrderModel(this.orderType, this.orderBy, "post_id");

        PostModel.getPosts(this, null, page, order).then((response) => {
            $('#postList').dataTable({
                scrollX: true,
                columns: [
                    {'data': 'post_id'},
                    {'data': 'user_id'},
                    {'data': 'category_id'},
                    {'data': 'post_title'},
                    {'data': 'post_content'},
                    {'data': 'post_created_at'},
                    {'data': 'post_updated_at'}
                ],
                columnDefs: [ {
                    targets: [7],
                    data: 'post_id',
                    render: function ( data, type, full, meta ) {
                        return '<a href="'+ data +'">Edit</a>' + '&nbsp'
                                + '<a href="'+ data +'">Published</a>';
                    }
                }],

                // pagination
                pageLength: page.limit,
                displayStart: page.offset,
                order: [0, page.orderType],

                data: response.body
            });
        }, (response) => {
            console.log(response);
        });
    },

    route: {
        data({ to }) {
            if (to.query.order) {
                this.order = to.query.order;
            }
            if (to.query.by) {
                this.by = to.query.by;
            }
            if (to.query.limit) {
                this.limit = to.query.limit;
            }
        }
    }
}
</script>
