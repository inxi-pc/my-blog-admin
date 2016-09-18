<template>
    <div class="{{ getStyle('content-box-large') }}">
        <div class="{{ getStyle('panel-heading') }}">
            <div class="{{ getStyle('panel-title') }}">Post List</div>
            <div>
                <a v-link="{ path: '/posts/create' }">Create Post</a>
            </div>
        </div>
        <div class="{{ getStyle('panel-body') }}">
            <table id="postList" cellpadding="0" cellspacing="0" border="0"
            class="{{ getStyle('table', 'table-striped', 'table-bordered') }}">
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

import "datatables/media/js/jquery.dataTables.js"
import "datatables_bootstrap/css/dataTables.bootstrap.css"
import "datatables_bootstrap/js/dataTables.bootstrap.js"

import "bootstrap/dist/js/bootstrap.js"
import bootstrapStyle from "bootstrap/dist/css/bootstrap.css"
import appStyle from "app/css/styles.css"

export default {
    data: function () {
        return {
            posts: [],
            // pagination
            orderType: "DESC",
            orderBy: "post_id",
            limit: 10,
            offset: 0,
            total: 0,

            style: this.setStyle(bootstrapStyle, appStyle)
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
