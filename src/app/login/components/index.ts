import { LoginButton } from "./button";
import { Form } from "./form";
import { Header } from "./header";
import { Email } from "./inputs/email";
import { Password } from "./inputs/password";
import { Main } from "./main";
import { Root } from "./root";

export const Login = {
  Root,
  Main,
  Form,
  Header,
  Button: LoginButton,
  Inputs: {
    Email,
    Password,
  },
};
