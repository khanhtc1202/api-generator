var myApp = angular.module('myApp', ['ng-admin']);
var baseApiUrl = 'http://localhost:8081/api/';

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('My First Admin')
    	.baseApiUrl(baseApiUrl);

    // user
    var user = nga.entity('user').identifier(nga.field('_id'));
    user.listView()
        .fields([
            nga.field('name'),
            nga.field('username'),
            nga.field('email'),
            nga.field('phone'),
            nga.field('company.name'),
            nga.field('company.address'),
        ])
        .listActions(['edit', 'delete']);
    user.creationView()
        .fields([
            nga.field('name').validation({ required: true }),
            nga.field('username').validation({ required: true }),
            nga.field('email').validation({ required: true }),
            nga.field('phone').validation({ required: true }),
            nga.field('company.name').validation({ required: true }),
            nga.field('company.address').validation({ required: true }),
        ]);
    user.editionView().fields(user.creationView().fields());
    // company
    var company = nga.entity('company').identifier(nga.field('_id'));
    company.listView()
        .fields([
            nga.field('name'),
            nga.field('address'),
        ])
        .listActions(['edit', 'delete']);
    company.creationView()
        .fields([
            nga.field('name').validation({ required: true }),
            nga.field('address').validation({ required: true }),
        ]);
    company.editionView().fields(company.creationView().fields());
    // <%= categoryContent %>

    // user
    admin.addEntity(user);
    // company
    admin.addEntity(company);
    // <%= categoryEntity %>

    admin.menu(nga.menu()
        // user
        .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
        // company
        .addChild(nga.menu(company).icon('<span class="glyphicon glyphicon-user"></span>'))
        // <%= categoryMenu %>
    );

    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });
}]);