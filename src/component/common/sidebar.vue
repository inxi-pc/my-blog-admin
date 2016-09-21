<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="app/css/responsive.css"></style>
<style>
.content-box,
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

.box-with-header {
    border-top: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

.content-box-header {
    min-height: 40px;
    font-size: 16px;
    background: #f5f5f5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    border-right: 2px solid #eee;
}

.content-box-header:after {
    clear: both;
}

.sidebar ul.nav,
.sidebar ul.nav ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
}

.sidebar ul.nav ul {
    margin: 0px;
    padding: 0px;
    display: none;
}

.sidebar .nav li.open ul {
    display: block;
}

.sidebar .nav>li {
    margin: 0;
    border-bottom: 1px dashed #eee;
}

.sidebar .nav>li:last-child {
    border-bottom: 0px;
}

.sidebar .nav>li li {
    margin: 0;
}

.sidebar .nav>li li a {
    padding-left: 25px;
}

.sidebar .nav>li>a {
    font-size: 14px;
    line-height: 20px;
    padding: 15px 15px;
    color: #999;
    display: block;
    font-weight: bold;
    background: none;
    text-decoration: none;
    border-top: 0px;
    font-weight: bold;
}

.sidebar .nav>li>a>i {
    margin-right: 5px;
}

.sidebar .nav>li>ul>li>a {
    font-size: 13px;
    line-height: 20px;
    padding: 8px 10px 8px 40px;
    color: #999;
    background: #fff;
    display: block;
    text-decoration: none;
    border-top: 0px;
    font-weight: bold;
}

.sidebar .nav>li>ul>li.active>a {
    background: #fff;
    border-top: 0px;
    color: #555;
}

.sidebar .nav>li>ul>li>a:hover {
    background: #fff;
    color: #555;
    border-bottom: 0px;
}

.sidebar .nav li a:hover,
.sidebar .nav li.current>a {
    background: #fff;
    color: #555;
    border-bottom: 0px;
}

.sidebar .nav li.open>a {
    background: #fff;
    color: #555;
    border-bottom: 1px dashed #eee;
}

.sidebar .nav a .caret {
    float: right;
    width: 0;
    height: 0;
    display: inline-block;
    vertical-align: top;
    border-top: 4px solid #aaa;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    content: "";
    margin-top: 8px;
    margin-left: 2px;
}

.sidebar .nav a:hover .caret {
    border-top-color: #aaa;
}

.sidebar .nav li.open>a>.caret {
    border-top: none;
    border-bottom: 4px solid #aaa !important;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

.sidebar .nav li.open>a:hover>.caret {
    border-bottom-color: #aaa;
}
</style>

<template>
    <div id="leftSidebar" class="sidebar content-box" style="display: block;">
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
            <li>
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
    data: function () {
        return {

        }
    },

    methods: {
        active: function (event) {
            var nav = $('#leftSidebar').children('ul');
            var thisParent = $(event.target).parent('li');
            nav.children('li').removeClass('open');
            thisParent.addClass("open");
        },

        slideMenu: function (event) {
            var nav = $('#leftSidebar').children('ul');
            var thisParent = $(event.target).parent("li");
            var submenu = $(event.target).next("ul");

            if(thisParent.hasClass("open")) {
                submenu.slideUp(350);
                thisParent.removeClass("open");
            } else {
                submenu.slideUp(350);
                nav.children('li').removeClass("open");
                submenu.slideDown(350);
                thisParent.addClass("open");
            }
        }
    }
}
</script>
