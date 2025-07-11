import './App.css';
import { RouterProvider } from 'react-router';
import router from "./routes/Router.js";
import { CustomThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext.js';

function App() {
  localStorage.setItem("firstTime", true);

  return (
    <TimerProvider>
    <CustomThemeProvider>
      <RouterProvider router={router} />
    </CustomThemeProvider>
    </TimerProvider>
  );
}

export default App;
