'use client';

import useRegisterModal from "../../hooks/useRegisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {signUp} from 'aws-amplify/auth';
import useLoginModal from "../../hooks/useLoginModal";
import useConfirmSignUpModal from "../../hooks/useConfirmSignUpModal";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const confirmSignUpModal = useConfirmSignUpModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            name: data.name
          },
          autoSignIn: true,
        }
      })
      .then(data => {
        if(data.userId !== undefined) {
          confirmSignUpModal.setUserId(data.userId);
          registerModal.onClose();
          confirmSignUpModal.onOpen();
        } 
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
        title="Welcome to Airbnb"
        subtitle="Create an account!"
        center
      />

      <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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
          <div>Already have an account?</div>
          <div 
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;