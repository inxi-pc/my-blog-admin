<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="tinymce/skins/lightgray/skin.min.css"></style>
<style src="tinymce/skins/lightgray/content.min.css"></style>
<style scoped>
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
</style>

<template>
    <div class="content-box-large">
        <div class="panel-heading">
            <div class="panel-title">Post Edit/Create</div>
        </div>
        <div class="panel-body">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Post Id</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputPostId">
                    </div>
                </div>
                    <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">User</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputUserId">
                    </div>
                </div>
                    <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Category</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputCategoryId">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Post title</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputPostTitle">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Post Content</label>
                    <div class="col-sm-10">
                        <textarea id="inputPostContent"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="checkboxPublished"> Published now?
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-primary">Create</button>
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

export default {
    data: function () {
        return {

        };
    },

    ready: function () {
        this.initialEditor();
    },

    methods: {
        initialEditor: function () {
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
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
            });
        }
    }
}
</script>
