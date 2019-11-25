import { ref } from '@vue/composition-api';
import { getPage, getProduct } from '@shopware-pwa/shopware-6-client';

function getMainImageUrl(product, defaultUrl = "/img/product_thumb.png") {
    return (product.cover && product.cover.media) ? product.cover.media.url : defaultUrl;
}

function getMediaGallery(product) {
    return product && product.media ? product.media.map(media => {
        const smallThumb = media.media.thumbnails.find(thumb => thumb.width == "400");
        const normalThumb = media.media.thumbnails.find(thumb => thumb.width == "800");
        const bigThumb = media.media.thumbnails.find(thumb => thumb.width == "1920");
        return {
            small: { url: smallThumb ? smallThumb.url : "" },
            normal: { url: normalThumb ? normalThumb.url : "" },
            big: { url: bigThumb ? bigThumb.url : "" }
        };
    }) : [];
}

function getProductOptions(product, attribute) {
    if (!product || !product.children || !attribute) {
        return [];
    }
    const typeOptions = new Map();
    product.children.forEach(variant => {
        for (let option of variant.options) {
            if (option.group.name === attribute) {
                if (!typeOptions.has(option.id)) {
                    typeOptions.set(option.id, {
                        label: option.name,
                        value: variant.id,
                        color: option.name
                    });
                }
            }
        }
    });
    return Array.from(typeOptions.values());
}

function getProperties(product) {
    if (!product.properties) {
        return [];
    }
    const propertyList = product.properties.map(property => ({
        name: property.group.name,
        value: property.name
    }));
    return propertyList;
}

function getReviews(product) {
    if (!product.productReviews) {
        return [];
    }
    return product.productReviews.map(({ id, externalUser, customerId, createdAt, content, points }) => ({
        id,
        author: externalUser ? externalUser : customerId,
        date: createdAt,
        message: content,
        rating: points
    }));
}

function getProductOption(product, attribute) {
    return product.options && product.options.find(option => option.group.name === attribute);
}

function getRegularPrice(product) {
    return product.price ? product.price[0].gross : 0;
}

function getProperties$1(product) {
    return !!product.parentId;
}

var index = {
    getMainImageUrl,
    getMediaGallery,
    getProductOptions,
    getProperties,
    getProductOption,
    getReviews,
    getRegularPrice,
    isSimple: getProperties$1
};

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

export { index as helpers, useCms, useProduct };
