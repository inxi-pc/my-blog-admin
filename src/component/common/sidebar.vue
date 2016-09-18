<template>
    <div id="leftSidebar"class="{{ getStyle('sidebar', 'content-box') }}" style="display: block;">
        <ul class="{{ getStyle('nav') }}">
            <!-- Main menu -->
            <li>
                <a v-link="{ path: '/' }" v-on:click.stop="active($event)">
                    <i class="{{ getStyle('glyphicon', 'glyphicon-home') }}"></i> Dashboard
                </a>
            </li>
            <li>
                <a v-link="{ path: '/posts' }" v-on:click.stop="active($event)">
                    <i class="{{ getStyle('glyphicon', 'glyphicon-list') }}"></i>Post
                </a>
            </li>
            <li>
                <a v-link="{ path: '/posts' }" v-on:click.stop="slideMenu($event)">
                    <i class="{{ getStyle('glyphicon', 'glyphicon-list') }}"></i> Sub
                    <span class="{{ getStyle('caret', 'pull-right') }}"></span>
                </a>
                <!-- Sub menu -->
                <ul>
                    <li><a href="">Sub1</a></li>
                    <li><a href="">Sub2</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.js"
import bootstrapStyle from "bootstrap/dist/css/bootstrap.css"
import appStyle from "app/css/styles.css"

export default {
    data: function () {
        return {
            style: this.setStyle(bootstrapStyle, appStyle)
        }
    },

    methods: {
        active: function (event) {
            var nav = $('#leftSidebar').children('.nav');
            var li = $(event.target).parent('li');
            nav.children('li').removeClass('open');
            li.addClass("open");
        },

        slideMenu: function (event) {
            var nav = $('#leftSidebar').children('.nav');
            var li = $(event.target).parent("li");
            var ul = $(event.target).next("ul");

            if(li.hasClass("open")) {
                ul.slideUp(350);
                li.removeClass("open");
            } else {
                ul.slideUp(350);
                nav.children('li').removeClass("open");
                ul.slideDown(350);
                li.addClass("open");
            }
        }
    }
}
</script>
