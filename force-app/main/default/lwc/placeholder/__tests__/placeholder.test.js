import { createElement } from 'lwc';
import Placeholder from 'c/placeholder';
import { registerLdsTestWireAdapter } from '@salesforce/lwc-jest';

// Not used in the component under test.
import { getRecordUi } from 'lightning/uiRecordApi';

// Used in the component under test via @wire
import getProducts from '@salesforce/apex/ProductController.getProducts';

// Works fine. Expected use-case
//const getProductsAdapter = registerLdsTestWireAdapter(getProducts);

// Error when creating the element below: "Assert Violation: @wire on "wiredSharings": unknown adapter id"
// Error message feels weird because test doesn't reference "wiredSharings" anywhere and the adapter ID is
// the mock function they get by default from lwc-jest they probably don't know about
//const getRecordUiAdapter = registerLdsTestWireAdapter(getRecordUi);

// Without registring any test adapters, test passes and "wiring" or "disconnected" service callbacks never invoked

describe('c-placeholder', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('sets img url to be bike_assets resource', () => {
        debugger;

        // Works fine since registered before "wiring" callback called
        const getProductsAdapter = registerLdsTestWireAdapter(getProducts);

        const element = createElement('c-placeholder', {
            is: Placeholder
        });

        // This errors with 'connected' of undefined error.
        // Essentially the same issue as disconnected since 'wiring' callback not called.
        //const getProductsAdapter = registerLdsTestWireAdapter(getProducts);

        document.body.appendChild(element);

        // These both reproduce the error.
        // It registers the disconnected callback, which errors when the component is removed from the DOM.
        // const getRecordUiAdapter = registerLdsTestWireAdapter(getRecordUi);
        //const getProductsAdapter = registerLdsTestWireAdapter(getProducts);

        const img = element.shadowRoot.querySelector('img');
        // By default @salesforce/lwc-jest resolves the
        // @salesforce/resourceUrl/bike_assets import to "bike_assets"
        expect(img.src).toMatch(/\/bike_assets\//);
    });
});
