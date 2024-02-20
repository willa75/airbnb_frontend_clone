import './App.css';
import './utils/aws/Amplify';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import ConfirmSignUpModal from './components/modals/ConfirmSignUpModal';

function App() {
  return (
    <>
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />
      <ConfirmSignUpModal />
      <Navbar />
    </>
  );
}

export default App;
