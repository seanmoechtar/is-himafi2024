import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from 'next/navigation'
import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
  const session = await getServerAuthSession();  
  console.log("jwt session -------------------------------------------------------")
  console.log(session)
  if (!session) {
      redirect('/authpage/login/')
  }
  const canResetPassword = await prisma.user.findFirst({
    where: {
      nim: session.user.nim,
      passwordOverride: true,
    },
  })
  if (canResetPassword) {
    redirect('/authpage/resetpassword/')
  }
  if (session.user.role === 'PESERTA') {
      redirect('/peserta/')
  }
  if (session.user.role === 'ADMIN') {
    redirect('/admin/')
  } 

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={"/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >signin
            </Link>
            <Link
              href={"/api/auth/signout"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >signout
            </Link>
            
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
