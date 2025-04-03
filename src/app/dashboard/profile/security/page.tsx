import { ProfileSession } from "@/features/security/components/profile-sessions";

export default async function Page() {
  return (
    <div className="max-w-7xl space-y-6">
      <ProfileSession />
    </div>
  );
}
