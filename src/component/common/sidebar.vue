<style src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped>
    #leftSidebar {
        margin-bottom: 15px;
    }

	.sidebar {
		background-color: #fff;
		padding: 0;
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
		border-radius: 0;
		-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .065);
		-moz-box-shadow: 0 1px 4px rgba(0, 0, 0, .065);
		box-shadow: 0 1px 4px rgba(0, 0, 0, .065);
	}

	.sidebar > li > a {
		display: block;
		width: 190px\9;
		margin: 0 0 -1px;
		padding: 8px 14px;
		border: 1px solid #e5e5e5;
	}

	.sidebar > .active > a,
	.sidebar .active a:hover {
		background-color: #1e7ae3;
		color: #fff;
	}

	.sidebar > .active > a {
		position: relative;
		z-index: 2;
		padding: 9px 15px;
		border-bottom: 0;
		border-top: 0;
		text-shadow: 0 1px 0 rgba(0, 0, 0, .15);
		-webkit-box-shadow: inset 1px 0 0 rgba(0, 0, 0, .1), inset -1px 0 0 rgba(0, 0, 0, .1);
		-moz-box-shadow: inset 1px 0 0 rgba(0, 0, 0, .1), inset -1px 0 0 rgba(0, 0, 0, .1);
		box-shadow: inset 1px 0 0 rgba(0, 0, 0, .1), inset -1px 0 0 rgba(0, 0, 0, .1);
	}

	.left-sidebar > .sidebar {
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
	}

	.left-sidebar > .sidebar > li:first-child > a {
		-webkit-border-top-left-radius: 6px;
		-webkit-border-top-right-radius: 6px;
		-moz-border-radius-topleft: 6px;
		-moz-border-radius-topright: 6px;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	.left-sidebar > .sidebar > li:last-child > a {
		-webkit-border-bottom-right-radius: 6px;
		-webkit-border-bottom-left-radius: 6px;
		-moz-border-radius-bottomright: 6px;
		-moz-border-radius-bottomleft: 6px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	.left-sidebar > .sidebar > li .sidebar li a {
		padding-left: 20px;
	}

	.sidebar .glyphicon {
		float: right;
		margin-top: 2px;
		margin-right: -6px;
		opacity: .25;
	}

	.sidebar > li > a:hover {
		background-color: #f5f5f5;
	}

	.sidebar a:hover .glyphicon {
		opacity: .5;
	}

	.sidebar .active .glyphicon,
	.sidebar .active a:hover .glyphicon {
		opacity: 1;
	}
</style>

<template>
    <div id="leftSidebar" class="left-sidebar">
        <ul class="nav navbar-collapse collapse sidebar">
            <li id="dashboard">
                <a href="/dashboard.html"><i class="glyphicon glyphicon-chevron-right"></i>Dashboard</a>
            </li>
            <li id="post">
                <a href="/post.html"><i class="glyphicon glyphicon-chevron-right"></i>Post</a>
            </li>
            <li id="category">
                <a href="/category.html"><i class="glyphicon glyphicon-chevron-right"></i>Category</a>
            </li>
			<li class="user">
                <a href="/user.html"><i class="glyphicon glyphicon-chevron-right"></i>User</a>
            </li>
            <!-- <li>
                <a href="#"><i class="glyphicon glyphicon-chevron-down"></i>Others</a>
                <ul class="nav navbar-collapse collapse sidebar">
                    <li><a href="#"><i class="glyphicon glyphicon-chevron-right"></i> Submenu 1</a></li>
                    <li><a href="#"><i class="glyphicon glyphicon-chevron-right"></i> Submenu 2</a></li>
                    <li><a href="#"><i class="glyphicon glyphicon-chevron-right"></i> Submenu 3</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><span class="badge pull-right">731</span>Badge</a>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },

    props: {
        actived: {
            type: String,
            required: true
        }
    },

    ready: function () {
        var actived = $("#" + this.actived);
        var nav = $('#leftSidebar').children('ul');
        nav.children('li').removeClass('active');
        actived.addClass("active");
    },

    methods: {

    }
}
</script>
