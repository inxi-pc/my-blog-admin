<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="jquery.fancytree/dist/skin-bootstrap/ui.fancytree.css"></style>
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
    <div class="panel-default" id="categoryListComponent">
        <div class="content-box-header panel-heading">
            <div class="panel-title">Category List</div>
            <div class="action">
                <a href="/dist/category-create.html">Create Category</a>
            </div>
        </div>
        <div class="content-box-large box-with-header">
            <table id="treetable" class="table table-bordered table-condensed table-hover table-striped fancytree-fade-expander">
                <colgroup>
                    <col width="%4"></col>
                    <col width="10%"></col>
                    <col width="15%"></col>
                    <col width="15%"></col>
                    <col width="15%"></col>
                    <col width="*"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Expland</th> 
                        <th>Category Id</th> 
                        <th>Category Name EN</th> 
                        <th>Category Name CN</th> 
                        <th>Category Level</th> 
                        <th>Created At</th> 
                        <th>Updated At</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td> 
                        <td></td> 
                        <td></td> 
                        <td></td> 
                        <td></td> 
                        <td></td> 
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import 'jquery-ui/ui/plugin'
import 'jquery-ui/ui/widget'
import 'jquery-ui/ui/effect'
import 'jquery-ui/ui/keycode'
import 'jquery-ui/ui/tabbable'
import 'jquery.fancytree/dist/src/jquery.fancytree'
import 'jquery.fancytree/dist/src/jquery.fancytree.glyph'
import 'jquery.fancytree/dist/src/jquery.fancytree.table'

import Pagination from 'app_api/pagination.js'
import Sort from 'app_api/sort.js'
import Category from 'app_api/category.js'
import Auth from 'app_api/auth.js'
import { CategoryModel } from 'app_api/category.js'

export default {
    data: function () {
        return {
            categories: [],
            // pagination
            orderType: "desc",
            orderBy: "category_id",
            limit: 20,
            offset: 0,
            total: 0
        }
    },

    ready: function () {
        this.initFancyTree();
    },

    methods: {
        initFancyTree: function () {
            var context = this;
            var root = $(this.$el);
            var page = new Pagination(this.offset, this.limit);
            var sort = new Sort(this.orderType, this.orderBy, "category_id");
            var categoryApi = new Category();
            var data = {
                limit: page.limit,
                offset: page.offset,
                order_by: sort.order_by,
                order_type: sort.order_type,
                category_enabled: true,
                tree_enabled: true
            };
            var ajax = Auth.produceAuthorizedAjaxObject(categoryApi.listApiGateway, null, data);

            var glyph_opts = {
                map: {
                    doc: "glyphicon glyphicon-file",
                    docOpen: "glyphicon glyphicon-file",
                    checkbox: "glyphicon glyphicon-unchecked",
                    checkboxSelected: "glyphicon glyphicon-check",
                    checkboxUnknown: "glyphicon glyphicon-share",
                    dragHelper: "glyphicon glyphicon-play",
                    dropMarker: "glyphicon glyphicon-arrow-right",
                    error: "glyphicon glyphicon-warning-sign",
                    expanderClosed: "glyphicon glyphicon-menu-right",
                    expanderLazy: "glyphicon glyphicon-menu-right",  // glyphicon-plus-sign
                    expanderOpen: "glyphicon glyphicon-menu-down",  // glyphicon-collapse-down
                    folder: "glyphicon glyphicon-folder-close",
                    folderOpen: "glyphicon glyphicon-folder-open",
                    loading: "glyphicon glyphicon-refresh glyphicon-spin"
                }
            };

            root.find("#treetable").fancytree({
                extensions: ["glyph", "table"],
                glyph: glyph_opts,
                icon: false,
                source: ajax,
                
                postProcess: function (event, data) {
                    data.result = data.response.data;
                },

                renderTitle: function (event, data) {
                    return " ";
                },

                renderColumns: function (event, data) {
                    var node = data.node;
                    var tdList = $(node.tr).find(">td");
                    var operationHtml = '<a class="edit" data-id="' + node.data.category_id + '" href="#">Edit</a>'  
                                        + '&nbsp' +
                                        '<a class="delete" data-id="' + node.data.category_id +'" href="#">Delete</a>';
                    tdList.eq(1).text(node.data.category_id);
                    tdList.eq(2).text(node.data.category_name_en);
                    tdList.eq(3).text(node.data.category_name_cn);
                    tdList.eq(4).text(node.data.category_level);
                    tdList.eq(5).text(node.data.category_created_at);
                    tdList.eq(6).text(node.data.category_updated_at);
                    tdList.eq(7).html(operationHtml);
                },

                click: function (event, data) {
                    if (data.node.isExpanded()) {
                        data.node.setExpanded(false);
                    } else {
                        data.node.setExpanded(true);
                    }
                },

                init: function (event, data) {
                    root.find('.edit').each(function (i, element) {
                        $(element).on('click', function (e) {
                            var categoryId = $(element).data('id');
                            window.location.href = '/dist/category-edit.html?category_id=' + categoryId;
                            e.stopPropagation();
                        });
                    });

                    root.find('.delete').each(function (i, element) {
                        $(element).on('click', function (e) {
                            var categoryId = $(element).data('id');
                            categoryApi.deleteCategory(context, categoryId);
                            e.stopPropagation();
                        });
                    });
                },

                expand: function (event, data) {
                    root.find('.edit').each(function (i, element) {
                        $(element).on('click', function (e) {
                            var categoryId = $(element).data('id');
                            window.location.href = '/dist/category-edit.html?category_id=' + categoryId;
                            e.stopPropagation();
                        });
                    });

                    root.find('.delete').each(function (i, element) {
                        $(element).on('click', function (e) {
                            var categoryId = $(element).data('id');
                            categoryApi.deleteCategory(context, categoryId);
                            e.stopPropagation();
                        });
                    });
                }
            });
        },
    }
}
</script>
