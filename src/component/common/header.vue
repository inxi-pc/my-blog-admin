<template>
    <div class="{{ appStyle['header'] }}">
        <div class="{{ appStyle['container'] }}">
            <div class="{{ bootstrapStyle['row'] }}">
                <div class="{{ bootstrapStyle['col-md-5'] }}">
                    <!-- Logo -->
                    <div class="{{ appStyle['logo'] }}">
                        <h1><a href="">Owen's Blog</a></h1>
                    </div>
                </div>
                <div class="{{ bootstrapStyle['col-md-5'] }}">
                    <div class="{{ bootstrapStyle['row'] }}">
                        <div class="{{ bootstrapStyle['col-lg-12'] }}">
                        <div class="{{ bootstrapStyle['input-group'] + ' ' + appStyle['form'] }}">
                            <input type="text" class="{{ bootstrapStyle['form-control'] }}" placeholder="Search...">
                            <span class="{{ bootstrapStyle['input-group-btn'] }}">
                                <button class="{{ bootstrapStyle['btn'] + ' ' + bootstrapStyle['btn-primary'] }}" type="button">Search</button>
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="{{ bootstrapStyle['col-md-2'] }}">
                    <div class="{{ appStyle['navbar'] + ' ' + bootstrapStyle['navbar-inverse'] }}" role="banner">
                        <nav class="{{
                            bootstrapStyle['collapse'] + ' '
                            + appStyle['navbar-collapse'] + ' '
                            + bootstrapStyle['navbar-right']
                        }}" role="navigation">
                            <ul class="{{ bootstrapStyle['nav'] + ' ' + appStyle['navbar-nav'] }}">
                                <li class="{{ bootstrapStyle['dropdown'] }}">
                                    <a href="#" class="{{ bootstrapStyle['dropdown-toggle'] }}" data-toggle="dropdown">
                                        My Account <b class="{{ appStyle['caret'] }}"></b>
                                    </a>
                                    <ul class="{{
                                        appStyle['dropdown-menu'] + ' '
                                        + bootstrapStyle['animated'] + ' '
                                        + bootstrapStyle['fadeInUp']
                                    }}">
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
            appStyle: appStyle,
            bootstrapStyle: bootstrapStyle
        };
    }
}
</script>
