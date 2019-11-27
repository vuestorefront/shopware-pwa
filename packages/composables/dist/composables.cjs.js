'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compositionApi = require('@vue/composition-api');
var shopware6Client = require('@shopware-pwa/shopware-6-client');

const useCms = () => {
    const loading = compositionApi.ref(false);
    const page = compositionApi.ref(null);
    const error = compositionApi.ref(null);
    const search = async (path) => {
        loading.value = true;
        try {
            const result = await shopware6Client.getPage(path);
            page.value = result;
            return result;
        }
        catch (e) {
            error.value = e;
            console.error("Problem with fetching data", e.message);
        }
        finally {
            loading.value = false;
        }
    };
    return {
        page,
        loading,
        search,
        error
    };
};

const useProduct = (loadedProduct) => {
    const loading = compositionApi.ref(false);
    const product = compositionApi.ref(loadedProduct);
    const error = compositionApi.ref(null);
    const loadAssociations = async (associations) => {
        loading.value = true;
        try {
            const result = await shopware6Client.getProduct(product.value.id, associations);
            product.value = result;
        }
        catch (e) {
            error.value = e;
            console.error("Problem with fetching data", e.message);
        }
        finally {
            loading.value = false;
        }
    };
    const search = async (path) => {
        loading.value = true;
        try {
            const result = await shopware6Client.getProduct(path);
            product.value = result;
            return result;
        }
        catch (e) {
            error.value = e;
            console.error("Problem with fetching data", e.message);
        }
        finally {
            loading.value = false;
        }
    };
    return {
        product,
        loading,
        search,
        error,
        loadAssociations
    };
};

exports.useCms = useCms;
exports.useProduct = useProduct;
