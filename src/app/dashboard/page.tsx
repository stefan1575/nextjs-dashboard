import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// import { redirect } from 'next/navigation';
import LogoutButton from '@/components/logout-button';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw Error("The user is not authenticated please login")
  }

  return (
    <div>
      hi {session.user.email}
      <LogoutButton />
    </div>
  )
}