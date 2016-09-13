<template>
    <div class="sidebar content-box" style="display: block;">
        <ul class="nav">
            <!-- Main menu -->
            <li class="current">
                <a v-link="{ path: '/' }"><i class="glyphicon glyphicon-home"></i> Dashboard</a>
            </li>
            <li>
                <a v-link="{ path: '/post' }"><i class="glyphicon glyphicon-list"></i>Post</a>
            </li>
            <li class="submenu">
                <a v-link="{ path: '/post' }">
                    <i class="glyphicon glyphicon-list"></i> Post
                    <span class="caret pull-right"></span>
                </a>
                <!-- Sub menu -->
                <ul>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="signup.html">Signup</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>


<script>
export default {

}
</script>
