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
      console.log("callback", callback);
      loginModal.onClose();
      router.refresh();

      if (callback?.ok && !callback.error) {
        return toast.success("Logged in");
      }

      if (callback?.ok && callback?.error === "CredentialsSignin") {
        return toast.error("Invalid Password");
      }

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

  // Modal header
  const header = (
    <div className="flex items-center bg-[#000000] px-5 lg:px-10 w-full py-2">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-white" />
      </button>
      <p className="text-white font-bold text-base lg:text-lg flex-1 flex items-center justify-center">
        Register
      </p>
    </div>
  );

  // Modal body
  const body = (
    <div className="flex flex-col gap-3 lg:gap-5">
      <h4 className="text-lg lg:text-xl font-semibold text-white">
        Welcome to SEA CINEMA
      </h4>
      <p className="text-white text-sm lg:text-base">Create an account</p>

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
  const footer = (
    <p className="flex items-center justify-center text-sm lg:text-base w-full text-white font-medium">
      Already have an account?{" "}
      <button onClick={onToggle} className="ml-3 text-red font-bold">
        Sign In
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
    />
  );
};

export default LoginModals;
