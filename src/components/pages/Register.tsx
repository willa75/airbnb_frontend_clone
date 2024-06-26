import { useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import { signUp } from "aws-amplify/auth";
import useConfirmSignUpModal from "../../hooks/useConfirmSignUpModal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const confirmSignUpModal = useConfirmSignUpModal();

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

    return ( 
      <>
        <div 
          className="
            justify-center
            items-center
            flex
            inset-0
            z-50
            outline-none
            focus:outline-none"
        >
          <div
            className="
              relative
              w-full
              md:w-4/6
              lg:w-3/6
              xl:w-2/5
              my-6
              mx-auto
              h-full
              lg:h-auto
              md:h-auto"
          >
            {/* CONTENT */}
            <div
              className={`
                translate
                duration-300
                h-full
                'translate-y-0'
                'opacity-100'
              `}
            >
              <div
                className="
                  translate
                  h-full
                  lg:h-auto
                  md:h-auto
                  border-0
                  relative
                  flex
                  flex-col
                  w-full
                  outline-none
                  focus:outline-none"
              >
                {/* HEADER */}
                <div
                  className="
                    flex
                    items-center
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]"
                >
                  <div className="text-lg font-semibold">
                    Register
                  </div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
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
                </div>
                {/* FOOTER */}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    
                    <Button
                      disabled={false}
                      label={'Register'}
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2 text-center justify-center">
                    <div>Already have an account?</div>
                    <div 
                      className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline"
                    >
                      <Link to={"/login"}>Log in</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Register;