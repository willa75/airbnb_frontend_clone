import { useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import { signIn } from "aws-amplify/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
    
        try {
          await signIn({
            username: data.email,
            password: data.password,
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
                    Login
                  </div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                    <div className="flex flex-col gap-4">
                        <Heading 
                            title="Welcome Back"
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
                </div>
                {/* FOOTER */}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    
                    <Button
                      disabled={false}
                      label={'Login'}
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2 text-center justify-center">
                    <div>No account yet?</div>
                    <div 
                      className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline"
                    >
                      <Link to={"/register"}>Register</Link>
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

export default Login;