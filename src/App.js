import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'react-jss';
import ScenesController from 'modules/scenesController';
import theme from 'modules/theme';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ScenesController />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
