// =====================================================================
// LISTLYUP — SUPERADMIN V2
// MINIMAL LOGIN PAGE (FRONTEND-ONLY)
// =====================================================================

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { verifyMockCredentials, storeSuperAdminSession, mockSuperAdmin } from "../dev/mockAuth";

interface AdminLoginPageProps {
  onSuccess: () => void;
}

export function AdminLoginPage({ onSuccess }: AdminLoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔐 [AdminLoginPage] handleSubmit called');
    console.log('🔐 [AdminLoginPage] email:', email);
    console.log('🔐 [AdminLoginPage] password:', password.replace(/./g, '*'));
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate async authentication
    setTimeout(() => {
      console.log('🔐 [AdminLoginPage] Verifying credentials...');
      const isValid = verifyMockCredentials(email, password);
      console.log('🔐 [AdminLoginPage] Credentials valid:', isValid);
      
      if (isValid) {
        console.log('✅ [AdminLoginPage] Login successful!');
        console.log('💾 [AdminLoginPage] Calling storeSuperAdminSession...');
        storeSuperAdminSession(mockSuperAdmin);
        console.log('📢 [AdminLoginPage] Showing success toast...');
        toast.success(`Welcome back, ${mockSuperAdmin.name}!`);
        console.log('🎯 [AdminLoginPage] Calling onSuccess callback...');
        onSuccess();
      } else {
        console.log('❌ [AdminLoginPage] Login failed - invalid credentials');
        toast.error("Invalid credentials");
        setPassword(""); // Clear password on error
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-1">
                SuperAdmin Portal
              </h1>
              <p className="text-sm text-slate-400">
                ListlyUp Platform Management
              </p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
            <p className="text-xs text-amber-200 text-center">
              ⚠️ Development Mode — Mock Authentication
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahirane@gmail.com"
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10 pr-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              Dev Credentials: ahirane@gmail.com / ah901990
            </p>
          </div>
        </div>

        {/* Bottom Warning */}
        <p className="text-xs text-slate-600 text-center mt-4">
          This is a development-only authentication system.
          <br />
          Not suitable for production use.
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;