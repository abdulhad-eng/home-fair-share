import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Mail, Phone, Home } from "lucide-react";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { initializeRecaptcha, signInWithPhone, verifyPhoneCode, getErrorMessage } from "@/lib/firebase-auth";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  onBack: () => void;
  onVerify: () => void;
  contactMethod: string; // email or phone
  contactValue: string; // the actual email or phone number
  confirmationResult?: ConfirmationResult; // Firebase phone auth confirmation result
}

export const OTPVerification = ({ onBack, onVerify, contactMethod, contactValue, confirmationResult }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentConfirmation, setCurrentConfirmation] = useState<ConfirmationResult | undefined>(confirmationResult);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize reCAPTCHA for phone verification if needed
    if (contactMethod === 'phone' && !currentConfirmation) {
      const sendOTP = async () => {
        try {
          const recaptchaVerifier = initializeRecaptcha('recaptcha-container');
          const { confirmationResult, error } = await signInWithPhone(contactValue, recaptchaVerifier);
          
          if (error) {
            toast({
              title: "Failed to send OTP",
              description: getErrorMessage(error),
              variant: "destructive",
            });
          } else if (confirmationResult) {
            setCurrentConfirmation(confirmationResult);
            toast({
              title: "OTP sent",
              description: `Verification code sent to ${contactValue}`,
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to initialize phone verification",
            variant: "destructive",
          });
        }
      };

      sendOTP();
    }
  }, [contactMethod, contactValue, currentConfirmation, toast]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      
      if (contactMethod === 'phone' && currentConfirmation) {
        try {
          const { user, error } = await verifyPhoneCode(currentConfirmation, otp);
          
          if (error) {
            toast({
              title: "Verification failed",
              description: getErrorMessage(error),
              variant: "destructive",
            });
          } else if (user) {
            toast({
              title: "Phone verified",
              description: "Your phone number has been verified successfully!",
            });
            onVerify();
          }
        } catch (error) {
          toast({
            title: "Verification failed",
            description: "Invalid verification code",
            variant: "destructive",
          });
        }
      } else {
        // For email verification, just proceed (email verification is handled differently in Firebase)
        onVerify();
      }
      
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    
    if (contactMethod === 'phone') {
      try {
        const recaptchaVerifier = initializeRecaptcha('recaptcha-container-resend');
        const { confirmationResult, error } = await signInWithPhone(contactValue, recaptchaVerifier);
        
        if (error) {
          toast({
            title: "Failed to resend OTP",
            description: getErrorMessage(error),
            variant: "destructive",
          });
        } else if (confirmationResult) {
          setCurrentConfirmation(confirmationResult);
          toast({
            title: "OTP resent",
            description: `New verification code sent to ${contactValue}`,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to resend verification code",
          variant: "destructive",
        });
      }
    } else {
      // For email, show a message (Firebase handles email verification differently)
      toast({
        title: "Check your email",
        description: "Please check your email for the verification link",
      });
    }
    
    setIsResending(false);
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
                disabled={!isValid || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Continue"}
              </Button>

              {/* Hidden reCAPTCHA containers for Firebase phone auth */}
              <div id="recaptcha-container" style={{ display: 'none' }}></div>
              <div id="recaptcha-container-resend" style={{ display: 'none' }}></div>

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