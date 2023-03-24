import React from 'react';
import ReactDOM from 'react-dom/client';
import Head from 'Head';
import App from './App';
import GlobalStyles from 'styles/GlobalStyles';
import 'styles/dist/tail.css'
import 'styles/dist/font.css'

import { MediaContextProvider, SearchContextProvider, SocketContextProvider, TasksContextProvider, UsersContextProvider } from 'contexts';
import { Provider } from "react-redux"
import { store } from 'reducers';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <MediaContextProvider>
                <UsersContextProvider>
                    <TasksContextProvider>
                        <SocketContextProvider>
                            <SearchContextProvider>
                                <GlobalStyles />
                                <Head />
                                <App />
                            </SearchContextProvider>
                        </SocketContextProvider>
                    </TasksContextProvider>
                </UsersContextProvider>
            </MediaContextProvider>
        </Provider>
    </React.StrictMode>
); 