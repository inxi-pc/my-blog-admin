<style src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped>
    .header {
        height: 55px;
        background-color: #f8f8f8;
        border-color: #e7e7e7;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 15px;
    }

    .header .logo h1 {
        font-size: 30px;
        margin: 0px;
        padding: 10px 0px;
    }

    .header .logo h1 a {
        font-family: 'Open Sans Condensed', sans-serif;
    }

    .header .logo h1 a:hover {
        text-decoration: none;
        border: 0px;
    }

    .header .form {
        margin-top: 10px;
        width: 100%;
        max-width: 300px;
        margin: 10px auto;
    }

    .header .navbar .label {
        font-size: 12px;
        padding: 4px 8px;
        margin: 0px 2px;
        border-radius: 15px !important;
    }

    .header .navbar {
        background: none !important;
        border: 0px !important;
    }

    .header .navbar i {
        margin-right: 3px;
    }

    .header .navbar .nav>li>a {
        color: #000 !important;
        font-size: 13px !important;
        border-bottom: 0px !important;
        margin-top: 0px !important;
        font-weight: bold;
    }

    .header .navbar-nav>.open>a,
    .header .navbar-nav>.open>a:hover,
    .header .navbar-nav>.open>a:focus {
        background: none !important;
    }

    .header .navbar-collapse {
        border: 0px !important;
    }

    .header .navbar-header {
        width: 43px;
        margin: 0 auto;
    }

    .header .navbar-header button {
        color: #fff !important;
        padding: 5px 10px;
    }

    .header .navbar-toggle {
        background-color: #1dc1da !important;
        border: 1px solid #0fa6bc !important;
    }

    .header .navbar-toggle:hover,
    .header .navbar-toggle:focus {
        background-color: #0fa6bc !important;
        border: 1px solid #0fa6bc !important;
    }

    .header .dropdown-menu {
        border-radius: 6px !important;
        background: #fff !important;
    }

    .header .dropdown-menu li {
        font-size: 13px;
        padding: 6px 15px;
        border-bottom: 1px dashed #f3f3f3;
    }

    .header .dropdown-menu li a {
        color: #888;
        padding-left: 0px !important;
    }

    .header .dropdown-menu li:last-child {
        border: 0px;
    }

    .header .dropdown-menu li a:hover {
        background: none !important;
        color: #666 !important;
        border: 0px !important;
    }

    .header .dropdown-big {
        min-width: 300px;
    }

    .header .dropdown-big .dropdown-head {
        padding: 7px 15px;
        background: #fcfcfc;
        border-bottom: 1px solid #ddd;
        margin-top: -5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .header .dropdown-big .dropdown-title {
        font-size: 13px;
        font-weight: bold;
        color: #999;
    }

    .header .dropdown-big .dropdown-body {
        background: #fff;
    }

    .header .dropdown-big .dropdown-foot {
        padding: 7px 15px;
        background: #fcfcfc;
        border-top: 1px solid #ddd;
        margin-bottom: -5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        font-size: 12px;
    }

    .header .dropdown-big .dropdown-foot a {
        color: #888;
    }

    .header .dropdown-big .dropdown-foot a:hover {
        color: #555;
        border-bottom: 0px;
    }

    /* Responsive CSS */

    /* Mobile phones */
    @media (max-width: 480px) {

    }

    /* Tablets */
    @media (max-width: 767px) {
        .container {
            width:100%;
        }
        .header {
            height:auto;
            padding:15px 0px;
        }
        .header .logo {
            text-align:center;
            padding-bottom:10px;
        }
        .header .navbar .nav > li > a:hover {
            background:#0fa6bc;
            border-radius:5px;
        }
        .navbar-toggle {
            margin-right:0px !important;
        }
    }

    /* Desktop */
    @media (max-width: 991px) {
        .header {
            height:auto;
            padding:15px 0px;
        }
        .header .logo {
            text-align:center;
            padding-bottom:10px;
        }
        .header .form {
            margin:10px auto;
        }
    }
</style>

<template>
    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <!-- Logo -->
                    <div class="logo">
                        <h1><a href="">Owen's Blog</a></h1>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="input-group form">
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-btn">
                                <button class="btn btn-primary" type="button">Search</button>
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="navbar navbar-inverse" role="banner">
                        <nav class="collapse navbar-collapse navbar-right" role="navigation">
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                        {{ user.user_name }}&nbsp&nbsp<b class="caret"></b>
                                    </a>
                                    <ul class="dropdown-menu animated fadeInUp">
                                    <li><a href="javascript:;" v-on:click="this.gotoModule('profile')">Profile</a></li>
                                    <li><a href="javascript:;" v-on:click="logout">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.js"

import { UserModel } from "app_api/user.js"
import Auth from 'app_api/auth.js'
import User from 'app_api/user.js'

export default {
    data: function () {
        return {
            user: new UserModel()
        }
    },

    ready: function () {
        new Auth().setPingTask(this);
        var user = Auth.getAuthorizedUser();

        new User().getUserById(this, user.user_id).then((response) => {
            this.user = response.body;
        }, (response) => {
            console.log(response);
        });
    },

    methods: {
        logout() {
            new Auth().logout();
            this.gotoModule("auth");
        }
    }
}
</script>
