var myApp = angular.module('myApp', ['ng-admin']);
var baseApiUrl = 'http://localhost:8081/api/';

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('My First Admin')
    	.baseApiUrl(baseApiUrl);

    // <%= categoryContent %>
    // var user = nga.entity('user')
    // 			  .identifier(nga.field('_id'));
    //     user.listView()
    //     .fields([
    //         nga.field('name').isDetailLink(true),
    //         nga.field('username'),
    //         nga.field('email'),
    //         nga.field('phone'),
    //         nga.field('company')
    //         	.map(function truncate(value, entry) {
    //         		var key = 'company.name';
			 //        return entry[key];
			 //      }),
    //     ]);
    // user.creationView().fields([
    //     nga.field('name')
    //         .validation({ required: true, minlength: 3, maxlength: 100 }),
    //     nga.field('username')
    //         .attributes({ placeholder: 'No space allowed, 5 chars min' })
    //         .validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{5,20}' }),
    //     nga.field('email', 'email')
    //         .validation({ required: true }),
    //     nga.field('phone'),
    //     nga.field('company.name')
    //     	.validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{3,20}' }),
    //     nga.field('company.address')
    //     	.validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{3,20}' }),
    // ]);
    // user.editionView().fields(user.creationView().fields());
    
    // <%= categoryEntity %>
    // admin.addEntity(user);

    admin.menu(nga.menu()
        // <%= categoryMenu %>
        //.addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
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