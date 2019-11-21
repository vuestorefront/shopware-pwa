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

exports.useCms = useCms;
