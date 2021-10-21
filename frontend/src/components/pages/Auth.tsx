import { VFC, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../types/loginTypes";
import { useNavigate } from "react-router";

export const Auth: VFC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const schema = yup.object({
    username: yup.string().required().min(2),
    password: yup.string().required().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormInput> = (data) => {};
  const toggleIsLogin = () => setIsLogin(!isLogin);

  return <>
  
  </>;
};
