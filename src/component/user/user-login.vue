<style src="bootstrap/dist/css/bootstrap.css"></style>
<style>
    .login-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
    }
    
    .login-wrapper .box {
        margin: 0 auto;
        padding: 30px 0 30px;
        float: none;
        -webkit-box-shadow: rgba(0, 0, 0, 0.4) 0 1px 3px, rgba(0, 0, 0, 0.35) 0 0 1px;
        -moz-box-shadow: rgba(0, 0, 0, 0.4) 0 1px 3px, rgba(0, 0, 0, 0.35) 0 0 1px;
        -ms-box-shadow: rgba(0, 0, 0, 0.4) 0 1px 3px, rgba(0, 0, 0, 0.35) 0 0 1px;
        -o-box-shadow: rgba(0, 0, 0, 0.4) 0 1px 3px, rgba(0, 0, 0, 0.35) 0 0 1px;
        box-shadow: rgba(0, 0, 0, 0.4) 0 1px 3px, rgba(0, 0, 0, 0.35) 0 0 1px;
        background: #fff;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        -ms-border-radius: 6px;
        -o-border-radius: 6px;
        border-radius: 6px;
    }
    
    .login-wrapper .box .content-wrap {
        width: 82%;
        margin: 0 auto;
    }
    
    .login-wrapper .box h6 {
        text-transform: uppercase;
        margin-bottom: 35px;
        font-size: 18px;
        font-weight: 600;
    }
    
    .login-wrapper .box input[type="text"],
    .login-wrapper .box input[type="password"] {
        font-size: 15px;
        height: 40px;
        margin-bottom: 10px;
        border-color: #b2bfc7;
        padding-left: 12px;
    }
    
    .login-wrapper .box input[type="text"]:focus,
    .login-wrapper .box input[type="password"]:focus {
        border: 1px solid #28a0e5;
        outline: none;
        -webkit-box-shadow: inset 0 1px 2px #ddd, 0px 0 5px #28a0e5;
        -moz-box-shadow: inset 0 1px 2px #ddd, 0px 0 5px #28a0e5;
        -ms-box-shadow: inset 0 1px 2px #ddd, 0px 0 5px #28a0e5;
        -o-box-shadow: inset 0 1px 2px #ddd, 0px 0 5px #28a0e5;
        box-shadow: inset 0 1px 2px #dddddd, 0px 0 5px #28a0e5;
    }
    
    .login-wrapper .box input[type="password"] {
        margin-bottom: 10px;
    }
    
    .login-wrapper .box .action {
        position: relative;
        top: 30px;
        padding: 15px 0px;
    }
    
    .login-wrapper .box .signup {
        text-transform: uppercase;
        font-size: 13px;
        padding: 7px 25px;
        border-radius: 5px;
    }
    
    .login-wrapper .already {
        margin: 0 auto;
        float: none;
        text-align: center;
        font-size: 13px;
        margin-top: 30px;
    }
    
    .login-wrapper .already p {
        display: inline-block;
        color: #222;
    }
    
    .login-wrapper .already a {
        color: #222;
        margin-left: 7px;
        border-bottom: 1px solid;
    }
    
    .login-wrapper .already a:hover {
        text-decoration: none;
        color: #000;
        border-bottom-color: #000;
    }
</style>

<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="login-wrapper">
                <div class="box">
                    <div class="content-wrap">
                        <h6>Log In</h6>
                        <input id="identifier" class="form-control" type="text" placeholder="Username/E-mail/Telephone">
                        <input id="password" class="form-control" type="password" placeholder="Password">
                        <div class="action">
                            <a class="btn btn-primary signup" id="login" v-on:click="login">Login</a>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UserModel } from 'app_api/user.js'
import User from 'app_api/user.js'

export default {
    data: function () {
        return {
            user: new UserModel()
        };
    },

    ready: function () {
        this.bindElementAction();
    },

    methods: {
        login: function () {
            new User().loginUser(this, this.user).then((response) => {
                console.log(response);
            }, (response) => {
                console.log(response);
            });
        },

        bindElementAction: function () {
            var context = this;
            var root = $(this.$el);
            var identifierElement = root.find("#identifier");
            var passwordElement = root.find("#password");
            
            identifierElement.on("change", function (e) {
                var value = $(e.target).val();
                var emailRegExp = new RegExp('[a-zA-Z1-9_-]+@[a-zA-Z1-9_-]+\.\w+');
                var telephoneRegExp = new RegExp('[1-9]+');

                if (emailRegExp.test(value)) {
                    context.user.user_email = value;    
                } else if (telephoneRegExp.test(value)) {
                    context.user.user_telephone = value;    
                } else {
                    context.user.user_name = value;
                }
            });

            passwordElement.on("change", function (e) {
                context.user.user_password = $(e.target).val();
            });
        }
    }
}
</script>