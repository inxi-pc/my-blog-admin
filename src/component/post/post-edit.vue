<template>
    <div class="{{ getStyle('content-box-large') }}">
        <div class="{{ getStyle('panel-heading') }}">
            <div class="{{ getStyle('panel-title') }}">Post Edit/Create</div>
            <div class="{{ getStyle('panel-options') }}">
                <a href="#" data-rel="collapse">
                    <i class="{{ getStyle('glyphicon', 'glyphicon-refresh') }}"></i>
                </a>
                <a href="#" data-rel="reload">
                    <i class="{{ getStyle('glyphicon', 'glyphicon-cog') }}"></i>
                </a>
            </div>
        </div>
        <div class="{{ getStyle('panel-body') }}">
            <textarea id="postEditor"></textarea>
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
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'

import "bootstrap/dist/js/bootstrap.js"
import bootstrapStyle from "bootstrap/dist/css/bootstrap.css"
import appStyle from "app/css/styles.css"

export default {
    data: function () {
        return {
            style: this.setStyle(bootstrapStyle, appStyle)
        };
    },

    ready: function () {
        this.initialEditor();
    },

    methods: {
        initialEditor: function () {
            tinymce.remove();
            tinymce.init({
                selector: "#postEditor",
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
    },

    route: {
        data({ to }) {
            this.initialEditor();
        }
    }
}
</script>
