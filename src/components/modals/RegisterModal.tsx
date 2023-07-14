"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import { toast } from "react-hot-toast";
import CrossIcon from "../icons/CrossIcon";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import TextFields from "../TextFields";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  // Register and login modal hooks
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const router = useRouter()

  // State to handle registration form 
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");

  // Fetch data session 
  const { data: session } = useSession()

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", username: "", password: "" },
  });
  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
    const parsedAge = parseInt(data.age, 10); // Parse age as an integer
    const requestData = { ...data, age: parsedAge }; // Update age value with parsed integer
    // Prevent registration while still logged in
    if (!session) {
      if (password !== passwordConfirmation) {
        return toast.error("Mismatch password and password confirmation")
      }
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(requestData),
        })
        const responseMsg = await response.json();
        if (response.ok) {
          registerModal.onClose();
          if (responseMsg.status === 409 || responseMsg.status === 204) { // Check respon status from server
            return toast.error(responseMsg.message)
          }
          toast.success(responseMsg.message);
          signIn("credentials", { username, password });
          return router.refresh()
        }
        else {
          router.refresh()
          return toast.error(responseMsg.message);
        }
      } catch (err) {
        router.refresh()
        return toast.error("Something went wrong");
      }
    }
    else {
      router.refresh()
      return toast.error("You must log out before registration")
    }
  }, [session, registerModal, password, username, passwordConfirmation, router]);

  // Toggle between register and login modals
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  // Close register modal
  const onClose = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  // Register Modal Header
  const header = (
    <div className="flex items-center bg-soft-black px-5 lg:px-10 w-full py-2">
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

  // Registration Modals Body
  const body = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="text-lg lg:text-xl font-semibold text-white">
          Welcome to SEA CINEMA
        </p>
        <p className="text-sm lg:text-base text-white"> Create an account</p>
        <TextFields
          type="text"
          register={register}
          errors={errors}
          required
          label="Username"
          id="username"
          value={username}
          setValue={setUsername}
        />
        <TextFields
          type="text"
          register={register}
          errors={errors}
          required
          label="Name"
          id="name"
          value={name}
          setValue={setName}
        />
        <TextFields
          type="text"
          register={register}
          errors={errors}
          required
          label="Age"
          id="age"
          value={age}
          setValue={setAge}
        />
        <TextFields
          type="password"
          register={register}
          errors={errors}
          required
          label="Password"
          id="password"
          value={password}
          setValue={setPassword}
        />
        <TextFields
          type="password"
          register={register}
          errors={errors}
          required
          label="Password Confirmation"
          id="password-confirmation"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
        />
        <Button color="red" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </div>
  );

  // Registration Modal Footer
  const footer = (
    <p className="flex items-center justify-center w-full text-white text-sm lg:text-base font-medium">
      Already have an account? {" "}
      <button onClick={onToggle} className="ml-3 text-red font-bold">
        Sign In
      </button>
    </p>
  );
  return (
    <Modal
      onClose={registerModal.onClose}
      header={header}
      isOpen={registerModal.isOpen}
      body={body}
      size="medium"
      footer={footer}
    />
  );
};

export default RegisterModal;
