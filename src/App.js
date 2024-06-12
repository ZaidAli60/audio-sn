import { useAuthContext } from 'context/AuthContext';
import './App.scss';
import Routes from './pages/Routes';
import { ConfigProvider } from 'antd';
import ScreenLoader from 'components/ScreenLoader';

function App() {

  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return <ScreenLoader />

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#299898',
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
