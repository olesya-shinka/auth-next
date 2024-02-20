import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../login/page";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>
        <Link href={`/dashboard/user/${session?.user.id}`}>профиль</Link>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default DashBoardLayout;
