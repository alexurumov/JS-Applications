import models from '../models/index.js';
import extend from '../utils/context.js';


export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial("../views/user/login.hbs");
            });
        },
        register(context) {
            extend(context).then(function () {
                this.partial("../views/user/register.hbs");
            });
        },
        logout(context) {
            models.user.logout().then(resp => {
                context.redirect('#/home');
            }).catch(err => {
                console.error(err);
            })
        },
        
    },
    post: {
        login(context) {
            const { email, password } = context.params;
            models.user.login(email, password)
                .then(resp => {
                    context.redirect('#/home');
                })
                .catch(err => {
                    console.error(err);
                })
        },
        register(context) {
            const { email, password } = context.params;

            /**
             * Password and Repeat password check not made, because of Repeat Password form name attribute {rep-pass} and inability to change the attribute!
             */


            models.user.register(email, password).then(resp => {
                    context.redirect('#/user/login');
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};