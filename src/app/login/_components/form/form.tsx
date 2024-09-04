import { Login } from "..";

import { useForm, Controller } from "react-hook-form";

export interface IFormInputs {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: (data: IFormInputs) => Promise<void>;
}

export function Form({ onSubmit }: IProps) {
  const { handleSubmit, control, formState } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Login.Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Login.Inputs.Email {...field} />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <Login.Inputs.Password {...field} />}
      />
      <Login.Button disabled={formState.isSubmitting}>Login</Login.Button>
    </Login.Form>
  );
}
