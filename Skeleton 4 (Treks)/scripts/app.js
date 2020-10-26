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

    // Treks

    this.get('#/trek/create', controllers.trek.get.create);
    this.get('#/trek/details/:trekId', controllers.trek.get.details);
    this.get('#/trek/edit/:trekId', controllers.trek.get.edit);
    this.get('#/trek/delete/:trekId', controllers.trek.delete.remove);
    this.get('#/trek/like/:trekId', controllers.trek.update.like);

    this.post('#/trek/create', controllers.trek.post.create);
    this.post('#/trek/edit/:trekId', controllers.trek.update.edit);
    
});

(() => {

    app.run('#/home');

})();