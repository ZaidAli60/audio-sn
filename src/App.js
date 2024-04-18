import './App.scss';
import Routes from './pages/Routes';
import { ConfigProvider } from 'antd';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#26f7c5',
          fontFamily: ""
        },
      }}
    >
      <div className={`App min-vh-100`}>
        <Routes />
      </div>
    </ConfigProvider >
  );
}

export default App;
