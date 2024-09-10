import { UserInfo } from "../userInfo";
export function Header() {
  return (
    <header className="flex pt-4" data-cy="header">
      <UserInfo.Root>
        <UserInfo.NameRoleContainer>
          <UserInfo.Name>Assane Diop</UserInfo.Name>
          <UserInfo.Role>Administrador</UserInfo.Role>
        </UserInfo.NameRoleContainer>
        <UserInfo.Avatar
          src="/assets/img/bglogin.jpg"
          alt="Imagem de usuário"
        />
      </UserInfo.Root>
    </header>
  );
}
