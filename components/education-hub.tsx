"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, BarChart3, Users, Search } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  category: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  enrolled: number
  rating: number
  description: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "Physician Financing 101",
    instructor: "Dr. Michael Brown",
    category: "Fundamentals",
    duration: "2.5 hours",
    level: "Beginner",
    enrolled: 1247,
    rating: 4.8,
    description: "Learn the fundamentals of physician financing, including loan structures and repayment options",
  },
  {
    id: "2",
    title: "Building Your Investment Portfolio",
    instructor: "Sarah Johnson",
    category: "Investing",
    duration: "3 hours",
    level: "Intermediate",
    enrolled: 892,
    rating: 4.7,
    description: "Master the art of portfolio construction and risk management for optimal returns",
  },
  {
    id: "3",
    title: "Tax Strategies for Healthcare Professionals",
    instructor: "Dr. James Martinez",
    category: "Wealth Planning",
    duration: "1.5 hours",
    level: "Advanced",
    enrolled: 654,
    rating: 4.9,
    description: "Advanced tax planning techniques specifically designed for physicians and medical professionals",
  },
  {
    id: "4",
    title: "Financial Freedom: Planning Your Future",
    instructor: "Michael Torres",
    category: "Wealth Planning",
    duration: "2 hours",
    level: "Beginner",
    enrolled: 1823,
    rating: 4.6,
    description: "Create a comprehensive financial plan that aligns with your career and lifestyle goals",
  },
]

export default function EducationHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All")

  const filteredCourses = courses.filter(
    (course) =>
      (selectedLevel === "All" || course.level === selectedLevel) &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Education Hub</h2>
          <p className="text-muted-foreground">Learn from industry experts and build your financial knowledge</p>
        </div>
        <Button className="gap-2">
          <BookOpen className="h-4 w-4" />
          Request Course
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-secondary/30">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                selectedLevel === level
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="p-6 hover:border-primary transition cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <Badge
                variant={
                  course.level === "Beginner"
                    ? "secondary"
                    : course.level === "Intermediate"
                      ? "outline"
                      : "destructive"
                }
              >
                {course.level}
              </Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.enrolled} enrolled
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />⭐ {course.rating}
              </div>
            </div>

            <p className="text-sm font-medium text-muted-foreground mb-4">by {course.instructor}</p>

            <Button className="w-full">Enroll Now</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
