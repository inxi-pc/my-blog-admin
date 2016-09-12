exports.install =  function (Vue, options) {
    Vue.config = function () {
        return {resourceURI: 'localhost:8888/'};
    };
}
