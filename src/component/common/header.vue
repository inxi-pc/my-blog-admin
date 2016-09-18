<template>
    <div class="{{ getStyle('header') }}">
        <div class="{{ getStyle('container') }}">
            <div class="{{ getStyle('row') }}">
                <div class="{{ getStyle('col-md-5') }}">
                    <!-- Logo -->
                    <div class="{{ getStyle('logo') }}">
                        <h1><a href="">Owen's Blog</a></h1>
                    </div>
                </div>
                <div class="{{ getStyle('col-md-5') }}">
                    <div class="{{ getStyle('row') }}">
                        <div class="{{ getStyle('col-lg-12') }}">
                        <div class="{{ getStyle('input-group', 'form') }}">
                            <input type="text" class="{{ getStyle('form-control') }}" placeholder="Search...">
                            <span class="{{ getStyle('input-group-btn') }}">
                                <button class="{{ getStyle('btn', 'btn-primary') }}" type="button">Search</button>
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="{{ getStyle('col-md-2') }}">
                    <div class="{{ getStyle('navbar', 'navbar-inverse') }}" role="banner">
                        <nav class="{{ getStyle('collapse', 'navbar-collapse', 'navbar-right') }}" role="navigation">
                            <ul class="{{ getStyle('nav', 'navbar-nav') }}">
                                <li class="{{ getStyle('dropdown') }}">
                                    <a href="#" class="{{ getStyle('dropdown-toggle') }}" data-toggle="dropdown">
                                        My Account <b class="{{ getStyle('caret') }}"></b>
                                    </a>
                                    <ul class="{{ getStyle('dropdown-menu', 'animated', 'fadeInUp') }}">
                                    <li><a href="">Profile</a></li>
                                    <li><a href="">Logout</a></li>
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
import bootstrapStyle from "bootstrap/dist/css/bootstrap.css"
import appStyle from "app/css/styles.css"

export default {
    data: function () {
        return {
            style: this.setStyle(bootstrapStyle, appStyle)
        }
    }
}
</script>
