import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Account</h3>
        <p className="text-sm text-muted-foreground">
          Change your user information.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}