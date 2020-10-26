import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        dashboard(context) {

            models.cause.getAll().then(resp => {

                const causes = resp.docs.map(docModifier);

                context.causes = causes;

                extend(context).then(function() {
                    this.partial("../views/cause/dashboard.hbs");
                });
            })
            
        }, 
        create(context) {
            extend(context).then(function() {
                this.partial("../views/cause/create.hbs");
            });
        }, 
        details(context) {

            const { causeId } = context.params;

            models.cause.getById(causeId).then(resp => {
                
                const cause = docModifier(resp);
                context.cause = cause;

                context.canDonate = cause.uId !== localStorage.getItem('userId');

                extend(context).then(function() {
                    this.partial("../views/cause/details.hbs");
                });

            }).catch(err => console.error(err))
        }
    }, 
    post: {
        create(context) {

            const data = { 
                ...context.params, 
                uId: localStorage.getItem('userId'), 
                collectedFunds: 0, 
                donors: []}

            models.cause.create(data).then((resp) => {
                context.redirect('#/cause/dashboard');
            }).catch(err => {
                console.error(err);
            })
        }
    }, 
    delete: {
        close(context) {

            const { causeId } = context.params;

            models.cause.close(causeId).then(resp => {
                context.redirect('#/cause/dashboard');
            }).catch(err => console.error(err));
        }
    }, 
    update: {
        donate(context) {

            const { causeId, currentDonation } = context.params;

            models.cause.getById(causeId).then(resp => {
                
                /**
                 * Calculate the new amout of money collected
                 */
                const cause = docModifier(resp);
                const { collectedFunds, donors } = cause;
                let newAmount = Number(currentDonation) + Number(collectedFunds);

                /**
                 * Accumulate the updated donors []
                 */

                let donor = localStorage.getItem('username'); 
                debugger;
                if (!donors.includes(donors)) {
                    donors.push(donor);
                }
                
                const updatedData = {
                    collectedFunds: newAmount, 
                    donors
                }

                return models.cause.donate(causeId, updatedData);
            }).then(resp => {
                context.redirect(`#/cause/details/${causeId}`);
            }).catch(err => console.error(err));
        }
    }
};