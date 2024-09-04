import { LoginButton } from "./button";
import { Form as FormContainer } from "./form";
import { Form } from "./form/form";
import { Header } from "./header";
import { Email } from "./inputs/email";
import { Password } from "./inputs/password";
import { Main } from "./main";
import { Root } from "./root";

export const Login = {
  Root,
  Main,
  Form: FormContainer,
  Header,
  Button: LoginButton,
  Inputs: {
    Email,
    Password,
  },
  FormWithInputs: Form,
};
