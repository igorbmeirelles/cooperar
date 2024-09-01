import { Header } from "../header";
import { SideNavigation } from "../sideNavigation";
import { Root } from "./root";

interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function Layout({ children }: IProps) {
  return (
    <Root>
      <SideNavigation />
      <Header />
      {children}
    </Root>
  );
}
