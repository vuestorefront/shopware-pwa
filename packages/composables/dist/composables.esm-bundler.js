import { ref } from '@vue/composition-api';
import { getPage, getProduct } from '@shopware-pwa/shopware-6-client';

const useCms = () => {
    const loading = ref(false);
    const page = ref(null);
    const error = ref(null);
    const search = async (path) => {
        loading.value = true;
        try {
            const result = await getPage(path);
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
    const loading = ref(false);
    const product = ref(loadedProduct);
    const error = ref(null);
    const loadAssociations = async (associations) => {
        loading.value = true;
        try {
            const result = await getProduct(product.value.id, associations);
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
            const result = await getProduct(path);
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

export { useCms, useProduct };
