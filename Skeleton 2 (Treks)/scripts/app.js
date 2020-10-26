import { requester } from './services/app-service.js';
import {
    homeViewHandler,
    loginHandler,
    registerViewHandler,
    logoutHandler,
    detailsTrekHandler,
    createTrekHandler,
    deleteTrekHandler,
    editTrekHandler, 
    likeTrekHandler, 
    profileHandler
} from './handlers/index.js';

const apiKey = 'https://routingapp-24985.firebaseio.com/';
requester.init(apiKey, sessionStorage.getItem('token'));


/**
 * Configure the application with all it's routes and the template engine that it uses 
 */
const app = Sammy('#main', function () {
    /**
     * Setting handlebars as template engine
     */
    this.use('Handlebars', 'hbs');

    /**
     * Home Router
     */
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    /**
     * Register Router
     */
    this.get('#/register', registerViewHandler);
    this.post('#/register', () => false);
        /**
     * Login Router
     */
    this.get('#/login', loginHandler);
    this.post('#/login', () => false);
    /**
     * Logout Router
     */
    this.get('#/logout', logoutHandler);
    /**
     * Create Router
     */
    this.get('#/create', createTrekHandler);
    this.post('#/create', () => false);
    /**
     * Details Router
     */
    this.get('#/details/:id', detailsTrekHandler);
    /**
     * Edit Router
     */
    this.get('#/edit/:id', editTrekHandler);
    this.post('#/edit/:id', () => false);
    /**
     * Delete Router
     */
    this.get('#/delete/:id', deleteTrekHandler);
    /**
     * Like Router
     */
    this.get('#/like/:id', likeTrekHandler);
    /**
     * Profile Router
     */
    this.get('#/profile', profileHandler);
});
/**
 * Start the application
 */
app.run('#/');

$(document).on({
    ajaxStart: () => $('#loadingBox').show(),
    ajaxStop: () => $('#loadingBox').fadeOut()
})