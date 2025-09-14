import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Mail, Phone, Home } from "lucide-react";

interface OTPVerificationProps {
  onBack: () => void;
  onVerify: () => void;
  contactMethod: string; // email or phone
  contactValue: string; // the actual email or phone number
}

export const OTPVerification = ({ onBack, onVerify, contactMethod, contactValue }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  const isValid = otp.length === 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Verify Account</h1>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-primary">
                <Home className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">RoomieSplit</h1>
                <p className="text-sm text-muted-foreground">Fair living made simple</p>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-primary animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle>Enter verification code</CardTitle>
              <CardDescription>
                We sent a 6-digit code to your {contactMethod}
                <br />
                <span className="font-medium text-foreground">{contactValue}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button 
                onClick={handleVerify}
                className="w-full"
                disabled={!isValid}
              >
                Verify & Continue
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Didn't receive the code?
                </p>
                <button 
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-sm text-primary font-medium hover:underline disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                The code will expire in 10 minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};