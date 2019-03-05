import { LightningElement, api, track, wire } from 'lwc';

/** Static Resources. */
import BIKE_ASSETS_URL from '@salesforce/resourceUrl/bike_assets';

import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class Placeholder extends LightningElement {
    @api message;
    filters = '{}';

    /** Url for bike logo. */
    @track logoUrl = BIKE_ASSETS_URL + '/logo.svg';

    @wire(getProducts, { filters: '{}', pageNumber: '1' })
    wiredSharings(result) {}
}
