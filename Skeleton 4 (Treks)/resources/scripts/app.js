import controllers from '../controllers/index.js';

const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', controllers.home.get.home);

    // User
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);
    this.get('#/user/logout', controllers.user.get.logout);
    this.get('#/user/profile', controllers.user.get.profile);
    
    this.post('#/user/login', controllers.user.post.login);
    this.post('#/user/register', controllers.user.post.register);

    // Articles

    this.get('#/article/create', controllers.article.get.create);
    this.get('#/article/details/:articleId', controllers.article.get.details);
    this.get('#/article/edit/:articleId', controllers.article.get.edit);
    this.get('#/article/delete/:articleId', controllers.article.delete.remove);

    this.post('#/article/create', controllers.article.post.create);
    this.post('#/article/edit/:articleId', controllers.article.update.edit);
    
});

(() => {

    app.run('#/home');

})();