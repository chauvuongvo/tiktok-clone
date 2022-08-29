import { Fragment, createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

export const ContextApp = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const userInfo = {
    avatar:
      'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f75993e97bd5424690cb3c702fc88b0d~c5_100x100.jpeg?x-expires=1660539600&x-signature=m%2FYxfG6Fl3AFKf3aRKJMRtt2sgA%3D',
    name: 'user-avatar',
    inbox: 10,
  };
  const valueContext = { currentUser, setCurrentUser, userInfo };

  return (
    <ContextApp.Provider value={valueContext}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </ContextApp.Provider>
  );
}

export default App;
