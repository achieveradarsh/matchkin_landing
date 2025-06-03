"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Moon,
  Sun,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Shield,
  ChevronDown,
  Brain,
  Target,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  MessageSquare,
  ArrowLeft,
  User,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react"

interface FormData {
  accountType: string
  fullName: string
  email: string
  phone: string
  industry: string
  jobTitle: string
  bio: string
  location: string
  hourlyRate: string
  additionalInfo: string
}

export default function MatchKinLanding() {
  const [isDark, setIsDark] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { scrollYProgress } = useScroll()

  const [formData, setFormData] = useState<FormData>({
    accountType: "",
    fullName: "",
    email: "",
    phone: "",
    industry: "",
    jobTitle: "",
    bio: "",
    location: "",
    hourlyRate: "",
    additionalInfo: "",
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.accountType) newErrors.accountType = "Please select an account type"
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    }

    if (step === 2) {
      if (!formData.industry) newErrors.industry = "Please select your primary industry"
      if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = () => {
    if (validateStep(2)) {
      // All validation passed, submit the form
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setCurrentStep(1)
        setFormData({
          accountType: "",
          fullName: "",
          email: "",
          phone: "",
          industry: "",
          jobTitle: "",
          bio: "",
          location: "",
          hourlyRate: "",
          additionalInfo: "",
        })
      }, 3000)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const stepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  }

  const industries = [
    "Finance",
    "Technology",
    "Healthcare",
    "Marketing",
    "Operations",
    "Strategy",
    "Human Resources",
    "Legal",
    "Sales",
    "Product Management",
    "Data & Analytics",
    "Other",
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        isDark
          ? "dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 text-slate-900"
      }`}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
          isDark ? "bg-black/20 border-b border-white/10" : "bg-white/70 border-b border-slate-200/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            }`}
          >
            MatchKin
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {["For Clients", "For Consultants", "How It Works"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -2 }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDark ? "hover:text-purple-400" : "text-slate-600 hover:text-purple-600"
                }`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </motion.button>

            <Button
              variant="outline"
              className={`transition-all duration-300 ${
                isDark
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            >
              Join Us
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className={`absolute inset-0 transition-all duration-700 ${
            isDark
              ? "bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"
              : "bg-gradient-to-br from-purple-100/50 via-white to-indigo-100/50"
          }`}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-purple-300/30"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Sparkles className={`w-12 h-12 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight">
            <span
              className={`transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-slate-800 via-purple-700 to-indigo-700 bg-clip-text text-transparent"
              }`}
            >
              CONNECT
            </span>
            <br />
            <span
              className={`transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent"
              }`}
            >
              PROJECTS
            </span>
            <br />
            <span className={isDark ? "text-white" : "text-slate-800"}>WITH EXPERT</span>
            <br />
            <motion.span
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className={`bg-[length:200%_100%] transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-r from-purple-400 via-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 via-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              CONSULTANTS
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
              isDark ? "text-gray-300" : "text-slate-600"
            }`}
          >
            AI-powered matching for seamless collaboration.
            <br />
            <span className={isDark ? "text-purple-300" : "text-purple-700"}>
              Find the perfect fit for your consulting needs.
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl group transition-all duration-300 ${
                  isDark
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-purple-500/25"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25"
                }`}
              >
                Join as a Client
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                }}
                className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 ${
                  isDark
                    ? "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
                    : "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                }`}
              >
                Join as a Consultant
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 sm:mt-16">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="cursor-pointer"
            >
              <ChevronDown className={`w-8 h-8 mx-auto ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2
              className={`text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              How It Works
            </h2>
            <p
              className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-700 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Three simple steps to connect with world-class consultants
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                icon: Target,
                title: "Define Your Project",
                description:
                  "Tell us about your project requirements, timeline, and budget. Our AI analyzes your needs.",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI-Powered Matching",
                description:
                  "Our advanced algorithm matches you with the most suitable consultants based on expertise and availability.",
              },
              {
                step: "03",
                icon: MessageSquare,
                title: "Start Collaborating",
                description:
                  "Connect directly with matched consultants, review proposals, and begin your project seamlessly.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative rounded-2xl p-6 sm:p-8 border transition-all duration-300 group ${
                  isDark
                    ? "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-purple-500/50"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/50 hover:border-purple-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div
                  className={`absolute top-4 right-4 text-6xl font-black opacity-10 transition-all duration-300 ${
                    isDark ? "text-white" : "text-slate-300"
                  }`}
                >
                  {step.step}
                </div>

                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-6">
                  <step.icon
                    className={`w-12 h-12 transition-colors duration-300 ${
                      isDark
                        ? "text-purple-400 group-hover:text-pink-400"
                        : "text-purple-600 group-hover:text-indigo-600"
                    }`}
                  />
                </motion.div>

                <h3
                  className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${
                    isDark ? "text-white group-hover:text-purple-300" : "text-slate-800 group-hover:text-purple-700"
                  }`}
                >
                  {step.title}
                </h3>

                <p
                  className={`leading-relaxed transition-all duration-700 ${
                    isDark ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2
              className={`text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              Why Choose MatchKin?
            </h2>
            <p
              className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-700 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Revolutionary AI-driven platform that transforms how businesses connect with expert consultants
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Matching",
                description:
                  "Our AI analyzes thousands of data points to find your perfect consultant match in seconds, not weeks.",
                stat: "< 5 min",
                statLabel: "Average matching time",
              },
              {
                icon: Shield,
                title: "Verified Expertise",
                description:
                  "Every consultant is thoroughly vetted with verified credentials, reviews, and proven track records.",
                stat: "98%",
                statLabel: "Client satisfaction rate",
              },
              {
                icon: Users,
                title: "Global Network",
                description: "Access to 10,000+ expert consultants across 50+ industries and 100+ countries worldwide.",
                stat: "10K+",
                statLabel: "Expert consultants",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support and project management tools to ensure smooth collaboration.",
                stat: "24/7",
                statLabel: "Customer support",
              },
              {
                icon: Award,
                title: "Quality Guaranteed",
                description:
                  "Money-back guarantee and quality assurance with milestone-based payments and escrow protection.",
                stat: "100%",
                statLabel: "Quality guarantee",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description:
                  "Track record of successful projects with measurable ROI and business impact for our clients.",
                stat: "300%",
                statLabel: "Average ROI",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 group ${
                  isDark
                    ? "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-purple-500/50"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/50 hover:border-purple-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-6">
                  <feature.icon
                    className={`w-12 h-12 transition-colors duration-300 ${
                      isDark
                        ? "text-purple-400 group-hover:text-pink-400"
                        : "text-purple-600 group-hover:text-indigo-600"
                    }`}
                  />
                </motion.div>

                <div
                  className={`text-2xl sm:text-3xl font-black mb-2 transition-colors duration-300 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  {feature.stat}
                </div>

                <div
                  className={`text-xs sm:text-sm mb-4 transition-all duration-700 ${
                    isDark ? "text-gray-500" : "text-slate-500"
                  }`}
                >
                  {feature.statLabel}
                </div>

                <h3
                  className={`text-lg sm:text-xl font-bold mb-4 transition-colors duration-300 ${
                    isDark ? "text-white group-hover:text-purple-300" : "text-slate-800 group-hover:text-purple-700"
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`text-sm sm:text-base leading-relaxed transition-all duration-700 ${
                    isDark ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-8 transition-all duration-700 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Trusted by Industry Leaders
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {["Fortune 500", "Startups", "SMEs", "Enterprises"].map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-4 sm:p-6 rounded-xl transition-all duration-300 ${
                    isDark ? "bg-white/5 border border-white/10" : "bg-white/60 border border-slate-200/50"
                  }`}
                >
                  <div
                    className={`text-lg sm:text-xl font-semibold transition-all duration-700 ${
                      isDark ? "text-purple-300" : "text-purple-700"
                    }`}
                  >
                    {type}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultant Onboarding Waitlist Section */}
      <section id="waitlist" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isDark
              ? "bg-gradient-to-r from-purple-900/10 to-pink-900/10"
              : "bg-gradient-to-r from-purple-100/30 to-indigo-100/30"
          }`}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 ${
              isDark
                ? "bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent"
            }`}
          >
            <span>Join the</span>
            <br />
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }
            >
              Revolution
            </span>
          </h2>

          <p
            className={`text-lg sm:text-xl mb-12 max-w-2xl mx-auto transition-all duration-700 ${
              isDark ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Be among the first to experience the future of consulting. Get early access and exclusive benefits.
          </p>

          {/* Multi-step Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 border transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/10"
                : "bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-2xl"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step ? 1.2 : 1,
                        backgroundColor:
                          currentStep >= step ? (isDark ? "#a855f7" : "#7c3aed") : isDark ? "#374151" : "#e2e8f0",
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step ? "text-white" : isDark ? "text-gray-400" : "text-slate-400"
                      }`}
                    >
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </motion.div>
                    {step < 3 && (
                      <motion.div
                        animate={{
                          backgroundColor:
                            currentStep > step ? (isDark ? "#a855f7" : "#7c3aed") : isDark ? "#374151" : "#e2e8f0",
                        }}
                        className="w-16 sm:w-24 h-1 mx-2 transition-all duration-300"
                      />
                    )}
                  </div>
                ))}
              </div>

              <motion.h3
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xl sm:text-2xl font-bold transition-all duration-700 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                Consultant Onboarding
              </motion.h3>

              <motion.p
                key={`subtitle-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm transition-all duration-700 ${isDark ? "text-gray-400" : "text-slate-600"}`}
              >
                Step {currentStep} of 3: {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Professional Details"}
                {currentStep === 3 && "Service Details"}
              </motion.p>
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Account Type */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-3 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Account Type
                    </Label>
                    <RadioGroup
                      value={formData.accountType}
                      onValueChange={(value) => updateFormData("accountType", value)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Label
                          htmlFor="individual"
                          className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            formData.accountType === "individual"
                              ? isDark
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-purple-600 bg-purple-50"
                              : isDark
                                ? "border-white/20 hover:border-white/30"
                                : "border-slate-300 hover:border-slate-400"
                          }`}
                        >
                          <RadioGroupItem value="individual" id="individual" />
                          <User className="w-5 h-5" />
                          <span className="font-medium">Individual Consultant</span>
                        </Label>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Label
                          htmlFor="company"
                          className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            formData.accountType === "company"
                              ? isDark
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-purple-600 bg-purple-50"
                              : isDark
                                ? "border-white/20 hover:border-white/30"
                                : "border-slate-300 hover:border-slate-400"
                          }`}
                        >
                          <RadioGroupItem value="company" id="company" />
                          <Building className="w-5 h-5" />
                          <span className="font-medium">Company / Agency</span>
                        </Label>
                      </motion.div>
                    </RadioGroup>
                    {errors.accountType && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.accountType}
                      </motion.p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Full Name
                    </Label>
                    <Input
                      placeholder="e.g., Dr. Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      } ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.fullName}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      placeholder="a@gmail.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      } ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Phone Number (Optional)
                    </Label>
                    <Input
                      placeholder="+1 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Industry */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Your Primary Industry
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                      <SelectTrigger
                        className={`transition-all duration-300 ${
                          isDark
                            ? "bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400"
                            : "bg-white/80 border-slate-300 text-slate-900 focus:border-purple-500 focus:ring-purple-500"
                        } ${errors.industry ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase()}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.industry}
                      </motion.p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Your Job Title / Headline
                    </Label>
                    <Input
                      placeholder="e.g., AI Strategy Consultant"
                      value={formData.jobTitle}
                      onChange={(e) => updateFormData("jobTitle", e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      } ${errors.jobTitle ? "border-red-500" : ""}`}
                    />
                    {errors.jobTitle && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.jobTitle}
                      </motion.p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Brief Bio / Company Overview (Optional)
                    </Label>
                    <Textarea
                      placeholder="Tell us about your expertise and experience..."
                      value={formData.bio}
                      onChange={(e) => updateFormData("bio", e.target.value)}
                      rows={4}
                      className={`transition-all duration-300 resize-none ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Location */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Location (Optional)
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="e.g., New York, NY or Remote"
                        value={formData.location}
                        onChange={(e) => updateFormData("location", e.target.value)}
                        className={`pl-10 transition-all duration-300 ${
                          isDark
                            ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                            : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Expected Hourly Rate (USD, Optional)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="e.g., 75"
                        value={formData.hourlyRate}
                        onChange={(e) => updateFormData("hourlyRate", e.target.value)}
                        className={`pl-10 transition-all duration-300 ${
                          isDark
                            ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                            : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <Label
                      className={`text-sm font-medium mb-2 block transition-all duration-700 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      Anything Else? (Optional)
                    </Label>
                    <Textarea
                      placeholder="Key skills, portfolio link, how you heard about us?"
                      value={formData.additionalInfo}
                      onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                      rows={4}
                      className={`transition-all duration-300 resize-none ${
                        isDark
                          ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                          : "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              {currentStep > 1 ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className={`transition-all duration-300 ${
                      isDark
                        ? "border-white/20 text-gray-300 hover:bg-white/10"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
              ) : (
                <div />
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className={`transition-all duration-300 ${
                      isDark
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitted}
                    className={`transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submitted!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          Submit to Waitlist
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-sm mt-6 transition-all duration-700 ${isDark ? "text-gray-500" : "text-slate-500"}`}
          >
            No spam, ever. Unsubscribe anytime. Join 10,000+ professionals already on the waitlist.
          </motion.p>

          {/* Waitlist Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 grid sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Star, text: "Early Access" },
              { icon: Zap, text: "Exclusive Features" },
              { icon: Award, text: "Special Pricing" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-all duration-300 ${
                  isDark ? "bg-white/5 border border-white/10" : "bg-white/60 border border-slate-200/50"
                }`}
              >
                <benefit.icon className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                <span className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-4 sm:px-6 border-t transition-all duration-700 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-2xl font-bold transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              MatchKin
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Contact", "About"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -2 }}
                  className={`transition-colors duration-300 ${
                    isDark ? "text-gray-400 hover:text-purple-400" : "text-slate-600 hover:text-purple-600"
                  }`}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            <div className={`text-sm transition-all duration-700 ${isDark ? "text-gray-500" : "text-slate-500"}`}>
              © 2024 MatchKin. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
