<template>
    <div class="sidebar content-box" style="display: block;" id="leftSidebar">
        <ul class="nav">
            <!-- Main menu -->
            <li>
                <a v-link="{ path: '/' }" v-on:click.stop="active($event)">
                    <i class="glyphicon glyphicon-home"></i> Dashboard
                </a>
            </li>
            <li>
                <a v-link="{ path: '/posts' }" v-on:click.stop="active($event)">
                    <i class="glyphicon glyphicon-list"></i>Post
                </a>
            </li>
            <li class="submenu">
                <a v-link="{ path: '/posts' }" v-on:click.stop="slideMenu($event)">
                    <i class="glyphicon glyphicon-list"></i> Sub
                    <span class="caret pull-right"></span>
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
export default {
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
