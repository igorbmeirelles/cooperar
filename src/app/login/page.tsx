"use client";

import { Logo } from "@/components/icons/logo/logo";
import { Login } from "./_components";
import { Cooperar } from "@/components/icons/logo/cooperar";

import { useAuth } from "../_context/auth";
import { IFormInputs } from "./_components/form/form";

export default function Page() {
  const { signIn } = useAuth();

  const onSubmit = async (data: IFormInputs) => {
    try {
      await signIn(data);
    } catch (ex: any) {
      alert(ex.message);
    }
  };

  return (
    <Login.Root>
      <Login.Main>
        <Login.Header>
          <Logo />
          <Cooperar />
        </Login.Header>
        <Login.FormWithInputs onSubmit={onSubmit} />
      </Login.Main>
    </Login.Root>
  );
}
