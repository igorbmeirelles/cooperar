import { Logo } from "@/components/icons/logo/logo";
import { Login } from "./_components";
import { Cooperar } from "@/components/icons/logo/cooperar";

export default function Page() {
  return (
    <Login.Root>
      <Login.Main>
        <Login.Header>
          <Logo />
          <Cooperar />
        </Login.Header>
        <Login.Form>
          <Login.Inputs.Email />
          <Login.Inputs.Password />
          <Login.Button>Login</Login.Button>
        </Login.Form>
      </Login.Main>
    </Login.Root>
  );
}
