import { createFormEntity } from './../form-helpers.js';
import { applyCommon } from './common.js';
import { requester } from './../services/app-service.js';
import { displaySuccess, displayError } from './../notifications.js';

/**
 * Logs user
 */
export async function loginHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    await this.partial('./templates/login/loginPage.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['email', 'password']);
        let formValue = form.getValue();

        /**
         * Authenticates a user with email and password
         */
        let loggedInUser;
        try {
            loggedInUser = await firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password);    
            displaySuccess('Successful login!');
        } catch (error) {
            displayError('Login failed');
            return;
        }
        const userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', loggedInUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);

        /**
         * Updates the requester authentication token
         */
        sessionStorage.setItem('token', userToken);
        requester.setAuthToken(userToken);


        this.redirect(['#/home']);
    });
}

/**
 * Registers user
 */
export async function registerViewHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    await this.partial('./templates/register/registerPage.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['email', 'password', 'rePassword']);
        let formValue = form.getValue();

        if (formValue.password !== formValue.rePassword) {
            throw new Error('Password and repeat password must match');
        }

        /**
         * Creates new user
         */
        const newUser = await firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password);

        let userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', newUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);

        sessionStorage.setItem('token', userToken);
        /**
         * Updates the requester authentication token
         */
        requester.setAuthToken(userToken);

        this.redirect(['#/home']);
    });

}

/**
 * Signs out user
 */
export function logoutHandler() {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect(['#/home']);
}

/**
 * User profile
 */
export async function profileHandler() {
    /**
     * Gets current user and fills its data to context
     */

    this.email = sessionStorage.getItem('email');
    let treks = await requester.treks.getAll();
    this.treks = treks || {};
    let numberOfTreks = Object.keys(treks || {}).length;
    this.numberOfTreks = numberOfTreks;
    if (numberOfTreks === 0) {
        this.noTreks = true;
    }
    
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partial('./templates/profile/profile-template.hbs');
}

