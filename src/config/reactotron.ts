import Reactotron from 'reactotron-react-native';
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';

import { apiClient } from '@/src/core/http/apiClient';
import { queryClient } from '@/src/core/http/queryClient';

const queryClientManager = new QueryClientManager({
  queryClient,
});

const reactotron = Reactotron.configure({
  name: 'my-fpl-reborn',
  onDisconnect: () => {
    queryClientManager.unsubscribe();
  },
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|localhost:8081/,
    },
  })
  .use(reactotronReactQuery(queryClientManager))
  .connect();

apiClient.interceptors.request.use((config) => {
  reactotron.display({
    name: 'API Request',
    preview: `${config.method?.toUpperCase() ?? 'GET'} ${config.url}`,
    value: {
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
      headers: config.headers,
    },
  });

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    reactotron.display({
      name: 'API Response',
      preview: `${response.status} ${response.config.url}`,
      value: {
        status: response.status,
        data: response.data,
      },
    });

    return response;
  },
  (error) => {
    reactotron.display({
      name: 'API Error',
      preview: error.message,
      value: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
      important: true,
    });

    return Promise.reject(error);
  },
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Reactotron {
    type ReactotronReactNative = typeof reactotron;
  }

  interface Console {
    tron: typeof reactotron;
  }
}

console.tron = reactotron;

export default reactotron;
