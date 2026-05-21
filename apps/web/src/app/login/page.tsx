"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PawPrint, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-br from-primary-50 to-warm-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-sage-100 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <PawPrint className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-sage-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-sage-500 mt-1">
              {isLogin ? "Sign in to your client portal" : "Join the Oak Crest family"}
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {isLogin && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-sage-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-sage-400">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2.5 border border-sage-200 rounded-xl text-sm text-sage-700 hover:bg-sage-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
                <button className="px-4 py-2.5 border border-sage-200 rounded-xl text-sm text-sage-700 hover:bg-sage-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#333" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  Apple
                </button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-sage-500 mt-6">
            {isLogin ? (
              <>Don&apos;t have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-primary-600 hover:underline font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-primary-600 hover:underline font-medium">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}