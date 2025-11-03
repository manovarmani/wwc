"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import InvestorDashboard from "@/components/investor-dashboard"
import { Logo } from "@/components/logo"

export default function InvestorPage() {
  const [view, setView] = useState<"onboarding" | "dashboard">("onboarding")

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      {view === "onboarding" ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Investor Platform</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access uncorrelated, attractive returns through physician financing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 hover:border-primary transition">
              <h3 className="text-xl font-bold mb-4">View Available Deals</h3>
              <p className="text-muted-foreground mb-6">
                Explore current physician funding opportunities with detailed financial metrics and risk assessments.
              </p>
              <Button className="w-full gap-2">
                Browse Opportunities <TrendingUp className="h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-8 hover:border-primary transition">
              <h3 className="text-xl font-bold mb-4">Enter Dashboard</h3>
              <p className="text-muted-foreground mb-6">
                View your portfolio, track returns, and monitor investment performance in real-time.
              </p>
              <Button className="w-full gap-2" onClick={() => setView("dashboard")}>
                Go to Dashboard <BarChart3 className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          {/* Benefits Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "12%+ IRR",
                description: "Attractive risk-adjusted returns uncorrelated to market cycles",
              },
              {
                icon: Users,
                title: "Diversified Pool",
                description: "Spread risk across multiple physicians and specialties",
              },
              {
                icon: TrendingUp,
                title: "Quarterly Distributions",
                description: "Regular payouts and detailed performance tracking",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8">
          <InvestorDashboard onBack={() => setView("onboarding")} />
        </div>
      )}
    </main>
  )
}
