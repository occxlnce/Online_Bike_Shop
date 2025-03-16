"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DatabaseSetup } from "@/components/database-setup"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const router = useRouter()

  const handleSetupComplete = () => {
    // Redirect to home page after setup is complete
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Database Setup</h1>
          <DatabaseSetup onSetupComplete={handleSetupComplete} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

