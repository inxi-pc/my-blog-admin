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
</style>

<template>
    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <!-- Logo -->
                    <div class="logo">
                        <h1><a href="#">Owen's Blog</a></h1>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    }
}
</script>
