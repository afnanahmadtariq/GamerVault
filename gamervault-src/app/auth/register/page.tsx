"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GamepadIcon as GameController, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [redirectPath, setRedirectPath] = useState<string>("/dashboard")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasLetterAndNumber: false,
    passwordsMatch: false
  })
  
  // Get redirect path from URL if available
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, []);

  // Validate password whenever it changes
  useEffect(() => {
    setPasswordValidation({
      minLength: formData.password.length >= 8,
      hasLetterAndNumber: /(?=.*[A-Za-z])(?=.*\d)/.test(formData.password),
      passwordsMatch: formData.password === formData.confirmPassword && formData.password !== ""
    })
  }, [formData.password, formData.confirmPassword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // Check password requirements before submission
    if (!passwordValidation.minLength || !passwordValidation.hasLetterAndNumber) {
      toast.error("Password does not meet requirements")
      return
    }

    setIsLoading(true)

    try {
      const result = await register(formData.username, formData.email, formData.password)

      if (!result.success) {
        toast.error(result.error || "Failed to register")
        setIsLoading(false)
        return
      }      
      toast.success("Registration successful!")
      router.push(redirectPath)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  // Helper for validation icons
  const ValidationIcon = ({ isValid }: { isValid: boolean }) => (
    isValid 
      ? <CheckCircle2 className="h-4 w-4 text-green-500" /> 
      : <AlertCircle className="h-4 w-4 text-amber-500" />
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/80 p-4 w-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GameController className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GamerVault</span>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your GamerVault account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="PlayerOne"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="gamer@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={formData.password && (!passwordValidation.minLength || !passwordValidation.hasLetterAndNumber) ? "border-amber-500" : ""}
              />
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-xs">Password requirements:</p>
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={passwordValidation.minLength} />
                  <span className={passwordValidation.minLength ? "text-muted-foreground" : "text-amber-500"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={passwordValidation.hasLetterAndNumber} />
                  <span className={passwordValidation.hasLetterAndNumber ? "text-muted-foreground" : "text-amber-500"}>
                    Contains at least one letter and one number
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formData.confirmPassword && !passwordValidation.passwordsMatch ? "border-amber-500" : ""}
              />
              
              {/* Password matching indicator */}
              {formData.confirmPassword && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <ValidationIcon isValid={passwordValidation.passwordsMatch} />
                  <span className={passwordValidation.passwordsMatch ? "text-green-500" : "text-amber-500"}>
                    {passwordValidation.passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !passwordValidation.minLength || !passwordValidation.hasLetterAndNumber || !passwordValidation.passwordsMatch}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
