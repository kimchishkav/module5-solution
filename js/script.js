(function (global) {
    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";

    function insertHtml(selector, html) {
        document.querySelector(selector).innerHTML = html;
    }

    function showLoading(selector) {
        var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    }

    function chooseRandomCategory(categories) {
        var randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex].short_name;
    }

    document.addEventListener("DOMContentLoaded", function () {
        showLoading("#main-content");

        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            function (categories) {
                var randomCategoryShortName = chooseRandomCategory(categories);

                $ajaxUtils.sendGetRequest(
                    homeHtmlUrl,
                    function (homeHtml) {
                        homeHtml = homeHtml.replace("{{randomCategoryShortName}}", randomCategoryShortName);
                        insertHtml("#main-content", homeHtml);
                    },
                    false
                );
            },
            true
        );
    });

    global.$dc = dc;
})(window);
