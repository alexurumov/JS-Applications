import { createFormEntity } from "./form-helpers.js";
import { fireBaseRequestFactory } from "./firebase-requests-helpers.js";
import { template } from "handlebars";

//Export common logic to function (set username and loggedIn variables to Sammy Context <this>) + (set header and footer to Context)
async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.username = sessionStorage.getItem('username');
    this.loggedIn = !!sessionStorage.getItem('token');
    this.hasNoTeam = true;
}

async function homeViewHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/home/home.hbs');
}

async function aboutViewHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/about/about.hbs');
}

async function loginViewHandler() {
    await applyCommon.call(this);
    this.partials.loginForm = await this.load('./templates/login/loginForm.hbs');
    await this.partial('./templates/login/loginPage.hbs');

    let formRef = document.querySelector('#login-form');

    let form = createFormEntity(formRef, ['username', 'password']);

    formRef.addEventListener('submit', (e) => {
        e.preventDefault();

        let formValue = form.getValue();
        // Firebase User Registration + Token & Username saved to Session Storage 
        firebase.auth()
            .signInWithEmailAndPassword(formValue.username, formValue.password)
            .then(resp => {
                firebase.auth().currentUser.getIdToken().then(token => {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('username', resp.user.email);
                });
                this.redirect(['#/home']);
            })
            .catch(() => {
                form.clear();
            })
    });

}

async function registerViewHandler() {
    await applyCommon.call(this);
    this.partials.registerForm = await this.load('./templates/register/registerForm.hbs');
    await this.partial('./templates/register/registerPage.hbs');

    let formRef = document.querySelector('#register-form');

    let form = createFormEntity(formRef, ['username', 'password', 'repeatPassword']);

    formRef.addEventListener('submit', (e) => {
        e.preventDefault();

        let formValue = form.getValue();

        if (formValue.password !== formValue.repeatPassword) {
            return;
        }

        // Firebase User Registration + Token & Username saved to Session Storage 
        firebase.auth()
            .createUserWithEmailAndPassword(formValue.username, formValue.password)
            .then(() => {
                this.redirect(['#/login']);
            })
            .catch(() => {
                form.clear();
            })


    });

}

async function logoutViewHandler() {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect(['#/home']);
}

async function catalogViewHandler() {
    await applyCommon.call(this);

    this.partials.team = await this.load('./templates/catalog/team.hbs');

    await this.partial('./templates/catalog/teamCatalog.hbs');

    //Firebase Authentication of User with token 
    let token = sessionStorage.getItem('token');
    let teamsData = await fetch(`https://routingapp-24985.firebaseio.com/teams.json?auth=${token}`).then(x => x.json());
    this.teams = teamsData;

}

async function createViewHandler() {
    await applyCommon.call(this);
    this.partials.createForm = await this.load('./templates/create/createForm.hbs');
    await this.partial('./templates/create/createPage.hbs');

    const firebaseTeams = fireBaseRequestFactory('https://routingapp-24985.firebaseio.com/', 'teams', sessionStorage.getItem('token'));

    let formRef = document.querySelector('#create-form');

    let form = createFormEntity(formRef, ['name', 'comment']);

    formRef.addEventListener('submit', (e) => {
        e.preventDefault();

        let formValue = form.getValue();

        firebaseTeams.createEntity(formValue).then(x => {
            console.log(x);
            this.redirect('#/catalog');
        })
    });

}

// initialize the application
var app = Sammy('#main', function () {
    // include a plugin -> In our case: Handlebars + hbs extension
    this.use('Handlebars', 'hbs');

    // define a 'route' -> describe below what happens when we load all site routes {#/, #/home, #/about, #/login, #/register ...}
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/about', aboutViewHandler);
    this.get('#/login', loginViewHandler);
    this.post('#/login', () => false);
    this.get('#/register', registerViewHandler);
    this.post('#/register', () => false);
    this.get('#/logout', logoutViewHandler);
    this.get('#/catalog', catalogViewHandler);
    this.get('#/create', createViewHandler);
    this.post('#/create', () => false);

});

// Add '$' to make sure the document is loaded with JQuerry
(() => {

    // start SammyJS -> Move <app.run('#/');> to our function 
    app.run('#/');

})();