import models from '../models/index.js';
import extend from '../utils/context.js';


export default {
    get:{
        login(context) {
            extend(context).then(function() {
                this.partial("../views/user/login.hbs");
            });
        }, 
        register(context) {
            extend(context).then(function() {
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
        profile(context) {

            models.trek.getAll().then(resp => {
                
                const treks = resp.docs.map(doc => doc.data().location);
                context.treks = treks;
                context.treksCount = Object.keys(treks).length;
                
                extend(context).then(function() {
                    this.partial("../views/user/profile.hbs");
                });
            }).catch(err => console.log(err));
            
        }
    }, 
    post:{
        login(context) {
            const {email, password} = context.params;
            models.user.login(email, password)
                .then(resp => {
                    context.redirect('#/home');
                })
                .catch(err => {
                    console.error(err);
                })
        }, 
        register(context) {
            const {email, password, rePassword} = context.params;
            if (password === rePassword) {
                models.user.register(email, password)
                    .then(resp => {
                        context.redirect('#/user/login');
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
    }
};