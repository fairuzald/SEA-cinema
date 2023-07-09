import React from "react";
import ProfileClient from "./ProfileClient";
import getCurrentUser from "../actions/getCurrentuser";
import getUsers from "../actions/getUsers";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

// Generate metadata title
export const metadata = {
  title: "Profile Page"
}

export default async function Page() {
  const currentUser = await getCurrentUser();
  const allUsers = await getUsers();
  if (!currentUser) {
    return notFound();
  }
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <ProfileClient currentUser={currentUser as User} allUsers={allUsers} />
    </main>
  );
}
