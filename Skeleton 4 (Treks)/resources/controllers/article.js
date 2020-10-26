import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        create(context) {
            extend(context).then(function() {
                this.partial("../views/article/create.hbs");
            });
        }, 
        details(context) {

            const { articleId } = context.params;

            models.article.getById(articleId).then(resp => {
                
                const article = docModifier(resp);

                context.article = article;

                context.isCreator = article.creator === localStorage.getItem('username');

                extend(context).then(function() {
                    this.partial("../views/article/details.hbs");
                });

            }).catch(err => console.error(err))
        }, 
        edit(context) {

            const { articleId } = context.params;

            models.article.getById(articleId).then(resp => {
                
                const article = docModifier(resp);
                context.article = article;

                extend(context).then(function() {
                    this.partial("../views/article/edit.hbs");
                });

            }).catch(err => console.error(err));
        }, 
    }, 
    post: {
            create(context) {
            const data = { 
                ...context.params, 
                creator: localStorage.getItem('username')
            };
           
            models.article.create(data).then((resp) => {
                context.redirect('#/home');
            }).catch(err => {
                console.error(err);
            })
        }
    }, 
    delete: {
        remove(context) {

            const { articleId } = context.params;

            models.article.remove(articleId).then(resp => {
                context.redirect('#/home');
            }).catch(err => console.error(err));
        }
    }, 
    update: {
        edit(context) {

            const { articleId } = context.params;
            const { title, category, content } = context.params;

            const data = {
                title, 
                category, 
                content, 
            };

            models.article.edit(articleId, data).then(resp => {
                context.redirect(`#/article/details/${articleId}`);
            }).catch(err => console.error(err));
        }
    }
};