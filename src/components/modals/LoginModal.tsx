'use client';

import useLoginModal from "../../hooks/useLoginModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {signIn} from 'aws-amplify/auth';
import useRegisterModal from "../../hooks/useRegisterModal";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await signIn({
        username: data.email,
        password: data.password
      })
      .finally(() => {
        setIsLoading(false);
      });
    } catch(error: any) {
      toast.error(error.message);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome back"
        subtitle="Login to your account!"
        center
      />

      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="f flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button 
        outline
        label="Continue with Facebook"
        icon={FaFacebook}
        onClick={() => {}}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light"
      >
        <div className="flex flex-row items-center gap-2 text-center justify-center">
          <div>No account yet?</div>
          <div 
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;