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

const RegisterModals = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", username: "", password: "" },
  });

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const parsedAge = parseInt(data.age, 10); // Parse age as an integer

    const requestData = { ...data, age: parsedAge }; // Update age value with parsed integer

    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then(() => {
        registerModal.onClose();
        toast.success("Your data was registered");
      })
      .catch((err) => toast.error("Failed to register your data"))
      .finally(() => setIsLoading(false));
  };

  // Toggle between register and login modals
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  // Close register modal
  const onClose = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);
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
  const body = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h4 className="text-lg lg:text-xl font-semibold text-white">
          Welcome to SEA CINEMA
        </h4>
        <p className="text-sm lg:text-base text-white"> Create an account</p>
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
          type="text"
          disabled={isLoading}
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
          disabled={isLoading}
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
  const footer = (
    <p className="flex items-center justify-center w-full text-white text-sm lg:text-base font-medium">
      Create an account{" "}
      <button onClick={onToggle} className="ml-3 text-red font-bold">
        Sign Up
      </button>
    </p>
  );
  return (
    <Modal
      header={header}
      isOpen={registerModal.isOpen}
      body={body}
      size="medium"
      footer={footer}
    />
  );
};

export default RegisterModals;
