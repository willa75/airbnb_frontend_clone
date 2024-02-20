'use client';

import useConfirmSignUpModal from "../../hooks/useConfirmSignUpModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import {confirmSignUp} from 'aws-amplify/auth';
import useLoginModal from "../../hooks/useLoginModal";


const ConfirmSignUpModal = () => {
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
      confirmationCode: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Submit function', data);
    setIsLoading(true);

    try {
      await confirmSignUp({
        username: confirmSignUpModal.userId || '',
        confirmationCode: data.confirmationCode
      })
      .then(data => {
        console.log('CONFIRMATION RESPONSE', data);
        confirmSignUpModal.onClose();
        loginModal.onOpen();
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
        title="Confirmation Code"
        subtitle="Confirm your account!"
        center
      />

      <Input 
        id="confirmationCode"
        label="Confirmation Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal 
      disabled={isLoading}
      isOpen={confirmSignUpModal.isOpen}
      title="Confirmation"
      actionLabel="Confirm"
      onClose={confirmSignUpModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ConfirmSignUpModal;