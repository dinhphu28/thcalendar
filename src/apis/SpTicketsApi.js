import axiosClient from './axiosClient';

const SpTicketsApi = {
    getById: (id) => {
        const url = `/sptickets/${id}`;

        return axiosClient.get(url, {
            headers: {
                'X-API-KEY': 'bkc4c0pWU0NkZTVFa21haA=='
            }
        });
    },

    put: (id, data) => {
        const url = `/sptickets/${id}`;

        return axiosClient.put(url, data, {
            headers: {
                'X-API-KEY': 'bkc4c0pWU0NkZTVFa21haA=='
            }
        });
    }
}

export default SpTicketsApi;