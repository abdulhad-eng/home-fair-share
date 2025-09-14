import { useState } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OTPVerification } from "@/components/auth/otp-verification";
import { CreateHousehold } from "@/components/household/create-household";
import { InviteMembers } from "@/components/household/invite-members";
import { AddExpense } from "@/components/expenses/add-expense";
import { HouseholdDashboard } from "@/components/dashboard/household-dashboard";

type Screen = 
  | "welcome"
  | "signup" 
  | "otp-verification"
  | "signin"
  | "create-household"
  | "invite-members"
  | "dashboard"
  | "add-expense";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<any>(null);
  const [householdData, setHouseholdData] = useState<any>(null);

  const handleSignUpComplete = (data: any) => {
    setUserData(data);
    setCurrentScreen("otp-verification");
  };

  const handleOTPVerified = () => {
    setCurrentScreen("create-household");
  };

  const handleSignIn = () => {
    setCurrentScreen("signin");
  };

  const handleHouseholdCreated = (data: any) => {
    setHouseholdData(data);
    setCurrentScreen("invite-members");
  };

  const handleInviteSkipped = () => {
    setCurrentScreen("dashboard");
  };

  const handleExpenseAdded = (expense: any) => {
    console.log("Expense added:", expense);
    setCurrentScreen("dashboard");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onGetStarted={() => setCurrentScreen("signup")} />;
      
      case "signup":
        return (
          <SignUpForm 
            onBack={() => setCurrentScreen("welcome")}
            onContinue={handleSignUpComplete}
            onSignIn={handleSignIn}
          />
        );
      
      case "otp-verification":
        return (
          <OTPVerification 
            onBack={() => setCurrentScreen("signup")}
            onVerify={handleOTPVerified}
            contactMethod={userData?.email ? "email" : "phone"}
            contactValue={userData?.email || userData?.phone || ""}
          />
        );
      
      case "signin":
        return (
          <SignUpForm 
            onBack={() => setCurrentScreen("welcome")}
            onContinue={() => setCurrentScreen("dashboard")}
            onSignIn={() => setCurrentScreen("signup")}
          />
        );
      
      case "create-household":
        return (
          <CreateHousehold 
            onBack={() => setCurrentScreen("otp-verification")}
            onContinue={handleHouseholdCreated}
          />
        );
      
      case "invite-members":
        return (
          <InviteMembers 
            onBack={() => setCurrentScreen("create-household")}
            onSkip={handleInviteSkipped}
            householdName={householdData?.name || "Your Household"}
          />
        );
      
      case "dashboard":
        return (
          <HouseholdDashboard 
            onAddExpense={() => setCurrentScreen("add-expense")}
            onInviteMembers={() => setCurrentScreen("invite-members")}
          />
        );
      
      case "add-expense":
        return (
          <AddExpense 
            onBack={() => setCurrentScreen("dashboard")}
            onSave={handleExpenseAdded}
          />
        );
      
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentScreen("signup")} />;
    }
  };

  return renderCurrentScreen();
};

export default Index;
