export const getCategories = (categories) => {
    return {
        type: "GET_CATEGORIES",
        payload: categories,
    };
};