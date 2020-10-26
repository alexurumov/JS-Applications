import { applyCommon } from './common.js';
import { createFormEntity } from '../form-helpers.js';
import { requester } from '../services/app-service.js';

export async function createTrekHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    await this.partial('./templates/trek/trek-create.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL']);
        let formValue = form.getValue();

        // formValue.createdByID = sessionStorage.getItem('userId');
        formValue.organiser = sessionStorage.getItem('email');
        formValue.likes = 0;

        await requester.treks.createEntity(formValue);

        form.clear();

        this.redirect('#/home');
    });
}

export async function detailsTrekHandler() {
    /**
     * Gets one trek from the db and map it to the expected by the template value + add it to the template context
     * 
     * -- this.params comes from the navigation url!!
     */
    this.trekId = this.params.id;
    let { location, dateTime, description, imageURL, likes, organiser } = await requester.treks.getById(this.params.id);
    this.location = location;
    this.dateTime = dateTime;
    this.description = description;
    this.imageURL = imageURL;
    this.likes = likes;
    this.organiser = organiser;
    this.isCreator = organiser === sessionStorage.getItem('email');
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partial('./templates/trek/trek-details.hbs');
}

export async function editTrekHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    await this.partial('./templates/trek/trek-edit.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL']);

    /**
     * Load and set the initial form value for edit
     */
    const trekToEdit = await requester.treks.getById(this.params.id);
    form.setValue(trekToEdit);

    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formValue = form.getValue();

        await requester.treks.patchEntity(formValue, this.params.id);

        /** 
         * Navigates back to the catalog details
         */
        this.redirect(`#/details/${this.params.id}`);
    });
}

export async function deleteTrekHandler() {

    await requester.treks.deleteEntity(this.params.id);

    /** 
     * Navigates back to the catalog details
     */
    this.redirect(`#/home`);

}

export async function likeTrekHandler() {

    this.trekId = this.params.id;

    const trekToLike = await requester.treks.getById(this.params.id);

    await requester.treks.patchEntity({likes: trekToLike.likes + 1}, this.params.id);

    /** 
     * Navigates back to the catalog details
     */
    this.redirect(`#/details/${this.params.id}`);

}