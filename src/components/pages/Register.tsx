import { useEffect } from "react";
import useRegisterModal from "../../hooks/useRegisterModal";

const Register: React.FC<{}> = () => {
  const registerModal = useRegisterModal();

  useEffect(() => {
    registerModal.onOpen();
  }, []);

  return (
    <div></div>
  );
};

export default Register;