"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { useState } from "react"

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<"physician" | "investor">("physician")

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex-shrink-0">
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:block" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#market" className="text-sm text-muted-foreground hover:text-foreground transition">
              Why Now
            </a>
            <Link href="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-secondary/50 rounded-full border border-border">
            <p className="text-sm font-medium text-foreground">Filling the physician funding gap</p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-balance">
            Innovative Funding for the <span className="text-primary">Next Generation</span> of Physicians
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            White Coat Capital unlocks the future earnings of physicians to fill critical funding gaps, accelerate
            wealth-building, and generate attractive returns for investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/physician">
              <Button size="lg" className="w-full sm:w-auto">
                For Physicians <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/investor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                For Investors <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section id="market" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">The Problem</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Archaic Underwriting</h3>
                    <p className="text-muted-foreground text-sm">
                      Current offerings ignore future earnings potential and physician-specific needs
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Wealth Delayed</h3>
                    <p className="text-muted-foreground text-sm">
                      Medical school debt and residency pay of ~$70k punish physicians pursuing medicine
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Projected Shortage</h3>
                    <p className="text-muted-foreground text-sm">
                      U.S. faces physician shortfall of 13,500 to 86,000 by 2036
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Doctor-First Financing</h3>
                      <p className="text-sm text-muted-foreground">
                        Tailored structures for every stage of physician career
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Uncorrelated Returns</h3>
                      <p className="text-sm text-muted-foreground">12%+ IRR, 2.00x+ MOIC, non-cyclical asset class</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Compliant & Mission-Driven</h3>
                      <p className="text-sm text-muted-foreground">Regulatory compliance built in from the start</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two paths to transform physician careers and investor portfolios
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveRole("physician")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeRole === "physician"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              For Physicians
            </button>
            <button
              onClick={() => setActiveRole("investor")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeRole === "investor"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              For Investors
            </button>
          </div>

          {/* Physician Flow */}
          {activeRole === "physician" && (
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: "1",
                  title: "Complete WCC Fit",
                  description: "5-minute questionnaire to understand your needs",
                },
                {
                  step: "2",
                  title: "Receive Proposals",
                  description: "3 tailored funding proposals that pass our Better-Off Test",
                },
                {
                  step: "3",
                  title: "Select & Fund",
                  description: "Choose your ideal structure and unlock up to $300k",
                },
                {
                  step: "4",
                  title: "Access Platform",
                  description: "Lifetime alumni access to community and wealth services",
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          )}

          {/* Investor Flow */}
          {activeRole === "investor" && (
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: "1",
                  title: "Complete Fit Assessment",
                  description: "5-minute questionnaire to match your goals",
                },
                {
                  step: "2",
                  title: "Design Portfolio",
                  description: "Optimize for returns, diversification, and impact",
                },
                {
                  step: "3",
                  title: "Deploy Capital",
                  description: "Fund structured agreements with uncorrelated returns",
                },
                {
                  step: "4",
                  title: "Track & Reinvest",
                  description: "Real-time dashboards with quarterly distributions",
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Market Size */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Massive Market Opportunity</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Total Addressable Market", value: "$37B+" },
              { label: "Serviceable Market", value: "$9B" },
              { label: "Initial Target", value: "$200M-$300M" },
              { label: "Target Physicians (5yr)", value: "5,000+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{item.value}</div>
                <p className="text-primary-foreground/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-secondary/50 p-12 rounded-xl border border-border">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">Join physicians and investors transforming healthcare financing</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/physician">
              <Button size="lg" className="w-full sm:w-auto">
                I'm a Physician
              </Button>
            </Link>
            <Link href="/investor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                I'm an Investor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground">
          <div>© 2025 White Coat Capital. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
