import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { Separator } from "@/components/ui/separator";

const profileSidebarItems = [
  {
    title: "Account",
    href: "/dashboard/profile",
  },
  {
    title: "Security",
    href: "/dashboard/profile/security",
  },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="space-y-6 p-6 pt-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-2 lg:space-x-12">
        <aside className="lg:w-1/5">
          <ProfileSidebar items={profileSidebarItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
