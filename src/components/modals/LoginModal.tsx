"use client";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import { toast } from "react-hot-toast";
import CrossIcon from "../icons/CrossIcon";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextFields from "../TextFields";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  // State to handle login form data
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
    // Login using next auth credentials
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      loginModal.onClose();
      router.refresh();
      // If callback is no error  and the data is valid
      if (callback?.ok && !callback.error) {
        return toast.success("Logged in");
      }
      // If callback is no error and the problem credentials sign in cause wrong pass
      if (callback?.ok && callback?.error === "CredentialsSignin") {
        return toast.error("Invalid Password");
      }
      // Iff callback is no error and no data user found
      if (callback?.ok && callback?.error === "Invalid credentials") {
        return toast.error("No found users, please register");
      } else {
        return toast.error("Something went wrong");
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

  // Login Modal header
  const header = (
    <div className="flex items-center bg-[#000000] px-5 lg:px-10 w-full py-2">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-white" />
      </button>
      <p className="text-white font-bold text-base lg:text-lg flex-1 flex items-center justify-center">
        Login
      </p>
    </div>
  );

  // Login Modal body
  const body = (
    <div className="flex flex-col gap-3 lg:gap-5">
      <p className="text-lg lg:text-xl font-semibold text-white">
        Welcome back to SEA CINEMA
      </p>
      <p className="text-white text-sm lg:text-base">Fill out your username and password to sign in</p>

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
  );

  // Login Modal Footer
  const footer = (
    <p className="flex items-center justify-center w-full text-white text-sm lg:text-base font-medium">
      First time using SEA Cinema?{" "}
      <button onClick={onToggle} className="ml-3 text-red font-bold">
        Sign Up
      </button>
    </p>
  );
  return (
    <Modal
      header={header}
      isOpen={loginModal.isOpen}
      body={body}
      footer={footer}
      size="medium"
      onClose={loginModal.onClose}
    />
  );
};

export default LoginModal;
