<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="datatables-bootstrap/css/dataTables.bootstrap.css"></style>
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
            <div class="panel-title">User List</div>
            <div class="action">
                <a href="/user-create.html">Create User</a>
            </div>
        </div>
        <div class="content-box-large box-with-header">
            <table id="userList" cellpadding="0" cellspacing="0" border="0"
            class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Telephone</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>User Enabled</th>
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
import User from 'app_api/user.js'
import Auth from 'app_api/auth.js'
import { UserModel } from 'app_api/user.js'

import "datatables-bootstrap/js/dataTables.bootstrap.js"
import "datatables/media/js/jquery.dataTables.js"

export default {
    data: function () {
        return {
            users: [],
            // pagination
            orderType: "desc",
            orderBy: "user_id",
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
            var userApi = new User();
            var data = {
                limit: page.limit,
                offset: page.offset,
                order_by: sort.order_by,
                order_type: sort.order_type,
                user_enabled: true
            };
            var ajax = Auth.produceAuthorizedAjaxObject(userApi.listApiGateway, null, data);

            root.find('#userList').dataTable({
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
                    {'data': 'user_id'},
                    {'data': 'user_id'},
                    {'data': 'user_name'},
                    {'data': 'user_email'},
                    {'data': 'user_telephone'},
                    {'data': 'user_created_at'},
                    {'data': 'user_updated_at'},
                    {'data': 'user_enabled'}
                ],
                columnDefs: [
                {
                    targets: [0],
                    data: 'user_id',
                    orderable: false,
                    render: function ( data, type, full, meta ) {
                        return "<input type='checkbox'/>";
                    }
                },
                {
                    targets: [8],
                    data: 'user_id',
                    orderable: false,
                    render: function ( data, type, full, meta ) {
                        return '<a data-id="' + data + '" href="javascript:;" class="edit">Edit</a>' + '&nbsp'
                                + '<a data-id="' + data + '" href="javascript:;" class="disable">Disable</a>';
                    }
                }]
            });

            root.find('#userList').on('preXhr.dt', function (e, settings, data) {
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
            });

            root.find('#userList').on('xhr.dt', function (e, settings, json, xhr) {
                console.log('xhr finished');
                var api = new $.fn.dataTable.Api(settings);
                json.recordsFiltered = json.recordsTotal;
            });

            root.find('#userList').on('draw.dt', function (e, settings) {
                root.find('.disable').each(function (i, element) {
                    $(element).on('click', function (e) {
                        var userId = $(element).data('id');
                        context.disableUser(userId);
                    });
                });

                root.find('.edit').each(function (i, element) {
                    $(element).on('click', function (e) {
                        var userId = $(element).data('id');
                        context.redirect('/user-edit.html?user_id=' + userId);
                    });
                })
            });
        },

        disableUser: function (userId) {
            new User().disableUser(this, userId).then((response) => {
                this.refreshPage();
            }, (response) => {
                console.log(response);
            });
        }
    }
}
</script>
