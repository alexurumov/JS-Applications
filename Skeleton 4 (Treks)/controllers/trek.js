import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        create(context) {
            extend(context).then(function() {
                this.partial("../views/trek/create.hbs");
            });
        }, 
        details(context) {

            const { trekId } = context.params;

            models.trek.getById(trekId).then(resp => {
                
                const trek = docModifier(resp);
                context.trek = trek;

                context.isOrganiser = trek.uId === localStorage.getItem('userId');

                extend(context).then(function() {
                    this.partial("../views/trek/details.hbs");
                });

            }).catch(err => console.error(err))
        }, 
        edit(context) {

            const { trekId } = context.params;

            models.trek.getById(trekId).then(resp => {
                
                const trek = docModifier(resp);
                context.trek = trek;

                extend(context).then(function() {
                    this.partial("../views/trek/edit.hbs");
                });

            }).catch(err => console.error(err));
        }, 
    }, 
    post: {
        create(context) {
            const data = { 
                ...context.params, 
                uId: localStorage.getItem('userId'), 
                likes: 0};

            models.trek.create(data).then((resp) => {
                context.redirect('#/home');
            }).catch(err => {
                console.error(err);
            })
        }
    }, 
    delete: {
        remove(context) {

            const { trekId } = context.params;

            models.trek.remove(trekId).then(resp => {
                context.redirect('#/home');
            }).catch(err => console.error(err));
        }
    }, 
    update: {
        edit(context) {

            const { trekId } = context.params;
            const { location, dateTime, description, imageURL } = context.params;

            const data = {
                location, 
                dateTime, 
                description, 
                imageURL};

            models.trek.edit(trekId, data).then(resp => {
                context.redirect(`#/trek/details/${trekId}`);
            }).catch(err => console.error(err));
        }, 
        like(context) {

            const { trekId } = context.params;

            models.trek.getById(trekId).then(resp => {
                
                /**
                 * Get current likes
                 */
                const trek = docModifier(resp);
                let { likes } = trek;
                likes++

                const updatedData = { likes };

                return models.trek.edit(trekId, updatedData);
            }).then(resp => {
                context.redirect(`#/trek/details/${trekId}`);
            }).catch(err => console.error(err));
        },
    }
};