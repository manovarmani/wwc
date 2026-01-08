"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, BarChart3, Users, Search, X, CheckCircle2 } from "lucide-react"

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
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState<Course | null>(null)
  const [requestTopic, setRequestTopic] = useState("")
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const filteredCourses = courses.filter(
    (course) =>
      (selectedLevel === "All" || course.level === selectedLevel) &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses((prev) => [...prev, courseId])
    setShowEnrollModal(null)
  }

  const handleRequestSubmit = () => {
    if (requestTopic.trim()) {
      setRequestSubmitted(true)
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestTopic("")
        setRequestSubmitted(false)
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Education Hub</h2>
          <p className="text-muted-foreground">Learn from industry experts and build your financial knowledge</p>
        </div>
        <Button className="gap-2" onClick={() => setShowRequestModal(true)}>
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
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id)
          return (
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
                  {course.enrolled + (isEnrolled ? 1 : 0)} enrolled
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  {course.rating}
                </div>
              </div>

              <p className="text-sm font-medium text-muted-foreground mb-4">by {course.instructor}</p>

              {isEnrolled ? (
                <Button className="w-full" variant="outline" disabled>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Enrolled
                </Button>
              ) : (
                <Button className="w-full" onClick={() => setShowEnrollModal(course)}>
                  Enroll Now
                </Button>
              )}
            </Card>
          )
        })}
      </div>

      {/* Request Course Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Request a Course</h3>
              <button
                onClick={() => {
                  setShowRequestModal(false)
                  setRequestTopic("")
                  setRequestSubmitted(false)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Request Submitted!</h4>
                <p className="text-muted-foreground">We'll review your request and get back to you soon.</p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Tell us what topic you'd like to learn about and we'll consider adding it to our curriculum.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Topic</label>
                    <input
                      type="text"
                      value={requestTopic}
                      onChange={(e) => setRequestTopic(e.target.value)}
                      placeholder="e.g., Real Estate Investment for Physicians"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Details (optional)</label>
                    <textarea
                      placeholder="Any specific aspects you'd like covered..."
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                    />
                  </div>
                  <Button className="w-full" onClick={handleRequestSubmit} disabled={!requestTopic.trim()}>
                    Submit Request
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Enroll Confirmation Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Enroll in Course</h3>
              <button onClick={() => setShowEnrollModal(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">{showEnrollModal.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{showEnrollModal.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {showEnrollModal.duration}
                </span>
                <span>by {showEnrollModal.instructor}</span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <p className="text-sm">
                <span className="font-semibold">Free for WCC members.</span> You'll have lifetime access to this course
                and all its materials.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowEnrollModal(null)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => handleEnroll(showEnrollModal.id)}>
                Confirm Enrollment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
