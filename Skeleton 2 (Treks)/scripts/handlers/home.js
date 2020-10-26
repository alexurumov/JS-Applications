import { applyCommon } from './common.js';
import { requester } from './../services/app-service.js'

export async function homeViewHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);

    let treks = await requester.treks.getAll();

    this.treks = Object.entries(treks || {}).map(([trekId, trek]) => ({...trek, trekId}));

    this.partial('./templates/home/home.hbs');
}
