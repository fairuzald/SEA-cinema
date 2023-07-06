"use client";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import ArrowIcon from "../icons/ArrowIcon";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Seat from "../Seat";
import Button from "../Button";
import { STEPS } from "@/app/movies/[movieId]/MovieClient";
import { toast } from "react-hot-toast";
import CrossIcon from "../icons/CrossIcon";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import TextFields from "../TextFields";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModals = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    // React Hook Form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: { username: "", password: "" },
    });
  
    // Register and login modal hooks
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
  
    // Submit form handler
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        setIsLoading(false);
        console.log(callback);
        if (callback?.ok) {
          router.refresh();
          toast.success("Logged in");
          return loginModal.onClose();
        }
        if (callback?.error) {
          toast.error("Something went wrong");
        }
      });
    };
  
    // Toggle between login and register modals
    const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [registerModal, loginModal]);
  
    // Close login modal
    const onClose = useCallback(() => {
      loginModal.onClose();
    }, [loginModal]);
  const header = (
    <div className="flex gap-7 items-center bg-soft-black px-5 lg:px-10 w-full py-2">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-white" />
      </button>
      <p className="text-black font-bold text-lg flex-1 flex items-center justify-center">
        Register
      </p>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold text-black">
          Welcome to SEA CINEMA
        </h4>
        <p className="text-bnb-soft-gray"> Create an account</p>
       
        <TextFields
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          label="Username"
          id="username"
          value={username}
          setValue={setUsername}
        />
        <TextFields
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          label="Password"
          id="password"
          value={password}
          setValue={setPassword}
        />

        <Button color="red" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </div>
  );
  return <Modal header={header} isOpen={loginModal.isOpen} body={body} />;
};

export default LoginModals;
