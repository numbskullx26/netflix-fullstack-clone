import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";

import prismadb from "@/libs/prismadb";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;

// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";
// import prismadb from "@/libs/prismadb";

// const serverAuth = async (req: NextApiRequest) => {
//   const session = await getSession({ req });

//   if (!session?.user?.email) {
//     throw new Error("Not Signed in");
//   }

//   const currentUser = await prismadb.user.findUnique({
//     where: {
//       email: session.user.email,
//     },
//   });

//   if (!currentUser) {
//     throw new Error("Not Signed in");
//   }

//   return currentUser;
// };

// export default serverAuth;
