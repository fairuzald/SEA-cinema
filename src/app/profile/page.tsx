
import React from "react";
import ProfileClient from "./ProfileClient";
import getCurrentUser from "../actions/getCurrentuser";
import { User } from "@prisma/client";

export default async function Page() {
  const currentUser = await getCurrentUser();
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
     <ProfileClient currentUser={currentUser} />
    </main>
  );
}
