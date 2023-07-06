
import React from "react";
import ProfileClient from "./ProfileClient";
import getCurrentUser from "../actions/getCurrentuser";
import { User } from "@prisma/client";
import getUsers from "../actions/getUsers";
export const dynamic = 'force-dynamic'

export default async function Page() {
  const currentUser = await getCurrentUser();
  const allUsers = await getUsers()
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
     <ProfileClient currentUser={currentUser} allUsers={allUsers}/>
    </main>
  );
}
