"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react"

export default function Dashboard() {
  const userType = "physician" // In a real app, this would come from auth

  if (userType === "physician") {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">Welcome, Dr. Jane Smith</h1>
              <p className="text-muted-foreground">Your physician platform dashboard</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Active Funding</p>
                    <p className="text-3xl font-bold">$200K</p>
                    <p className="text-xs text-muted-foreground mt-2">Balanced Track</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                    <p className="text-3xl font-bold">$1,800</p>
                    <p className="text-xs text-muted-foreground mt-2">Starting in 2 years</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Portfolio Value</p>
                    <p className="text-3xl font-bold">$245K</p>
                    <p className="text-xs text-muted-foreground mt-2">+22% growth</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platform Status</p>
                    <p className="text-3xl font-bold">Active</p>
                    <p className="text-xs text-muted-foreground mt-2">Member since Oct 2024</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Funding Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold">$200,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Disbursed</span>
                    <span className="font-semibold">$200,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold">6.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Next Payment Due</span>
                    <span className="font-semibold">In 24 months</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Platform Access</h2>
                <div className="space-y-4">
                  <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                    <div className="font-semibold mb-1">Career Resources</div>
                    <div className="text-sm text-muted-foreground">Interview prep & salary negotiations</div>
                  </button>
                  <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                    <div className="font-semibold mb-1">Wealth Management</div>
                    <div className="text-sm text-muted-foreground">Financial planning & investing</div>
                  </button>
                  <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                    <div className="font-semibold mb-1">Community Forum</div>
                    <div className="text-sm text-muted-foreground">Connect with other physicians</div>
                  </button>
                  <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                    <div className="font-semibold mb-1">Concierge Support</div>
                    <div className="text-sm text-muted-foreground">24/7 dedicated support team</div>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Investor Dashboard</h1>
            <p className="text-muted-foreground">Monitor your WCC investments in real-time</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Invested</p>
                  <p className="text-3xl font-bold">$2.5M</p>
                  <p className="text-xs text-muted-foreground mt-2">3 active funds</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Value</p>
                  <p className="text-3xl font-bold">$2.81M</p>
                  <p className="text-xs text-muted-foreground mt-2">+12.4% YTD</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Distributions</p>
                  <p className="text-3xl font-bold">$156K</p>
                  <p className="text-xs text-muted-foreground mt-2">Last quarter</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Portfolio IRR</p>
                  <p className="text-3xl font-bold">12.2%</p>
                  <p className="text-xs text-muted-foreground mt-2">Target: 12%+</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Active Funds</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-semibold">Fund Name</th>
                    <th className="text-left py-3 font-semibold">Allocation</th>
                    <th className="text-left py-3 font-semibold">Current Value</th>
                    <th className="text-left py-3 font-semibold">Return %</th>
                    <th className="text-left py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Orthopedic Surgery Fund",
                      allocation: "$875K",
                      value: "$985K",
                      return: "+12.6%",
                      status: "Active",
                    },
                    {
                      name: "Cardiology Fund",
                      allocation: "$875K",
                      value: "$980K",
                      return: "+12.0%",
                      status: "Active",
                    },
                    {
                      name: "Multi-Specialty Fund",
                      allocation: "$750K",
                      value: "$845K",
                      return: "+12.7%",
                      status: "Active",
                    },
                  ].map((fund) => (
                    <tr key={fund.name} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3">{fund.name}</td>
                      <td className="py-3">{fund.allocation}</td>
                      <td className="py-3 font-semibold">{fund.value}</td>
                      <td className="py-3 text-primary font-semibold">{fund.return}</td>
                      <td className="py-3">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                          {fund.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
