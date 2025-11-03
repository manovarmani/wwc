import WealthTools from "@/components/wealth-tools"

export default function ToolsIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-1">Wealth Tools</h1>
          <p className="text-sm text-muted-foreground">Access calculators, planners, and analysis tools</p>
        </div>
        <WealthTools />
      </div>
    </main>
  )
}


