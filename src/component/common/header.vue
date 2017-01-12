<style src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped>
    .header {
        height: 55px;
        background-color: #f8f8f8;
        border-color: #e7e7e7;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 15px;
    }

    .logo img {
        height: 50px;
        width: 50px;
    }

    .form {
        margin-top: 10px;
        width: 100%;
        max-width: 300px;
        margin: 10px auto;
    }

    .navbar {
        background: none !important;
        border: 0px !important;
    }

    .navbar-nav>.open>a,
    .navbar-nav>.open>a:hover,
    .navbar-nav>.open>a:focus {
        background: none !important;
    }

    .dropdown-header {
        padding: 4px 15px;
        font-size: 14px;
        color: #767676;
    }

    .dropdown-divider {
        height: 1px;
        margin: 8px 1px;
        background-color: #e5e5e5;
    }

    .dropdown-item {
        display: block;
        padding: 4px 10px 4px 15px;
        overflow: hidden;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .dropdown-item:hover {
        color: #fff;
        text-decoration: none;
        background-color: #4078c0;
    }
</style>

<template>
    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <!-- Logo -->
                    <div class="logo">
                        <a href=""><img src="/resource/icon.png"></a>
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
                    <div class="navbar navbar-inverse">
                        <nav class="collapse navbar-collapse navbar-right" role="navigation">
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                        <img class="avatar" height="20" src="https://avatars1.githubusercontent.com/u/8216273?v=3&amp;s=40" width="20">
                                        <i class="caret"></i>
                                    </a>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-header">Signed in as {{ user.user_name }}</div>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="javascript:;" v-on:click="this.gotoModule('profile')">Your Profile</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="javascript:;" v-on:click="logout">Logout</a>
                                    </div>
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

import 'app_asset/images/icon.png'

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
