const axios = require('axios');

async function loadData(url) {
    const result = {
        data: [],
        isLoading: true,
        error: null
    };

    try {
        const response = await axios.get(url);
        result.data = response.data;
        result.isLoading = false;
    } catch (error) {
        result.error = error.message;
        result.isLoading = false;
    }

    return result;
}

module.exports = { loadData };