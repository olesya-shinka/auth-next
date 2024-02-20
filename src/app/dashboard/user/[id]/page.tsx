import { authOptions } from "@/app/login/page";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `https://fakestoreapi.com/users/${props.params.id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const user = await response.json();

  return (
    <div>
      <div>Профиль пользователя</div>
      <div>
        <p>Name:</p>
        <p>{user.name}</p>
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
