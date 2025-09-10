import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Link, MessageSquare, ArrowLeft, Copy, Check } from "lucide-react";

interface InviteMembersProps {
  onBack: () => void;
  onSkip: () => void;
  householdName: string;
}

export const InviteMembers = ({ onBack, onSkip, householdName }: InviteMembersProps) => {
  const [inviteLink] = useState("https://roomiesplit.app/join/abc123");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Invite Roommates</h1>
          </div>

          <Card className="border-0 shadow-primary animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle>Invite Members to {householdName}</CardTitle>
              <CardDescription>
                Share the invite link or QR code with your roommates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="text-center">
                <div className="w-40 h-40 bg-muted rounded-lg mx-auto flex items-center justify-center mb-4">
                  <QrCode className="w-20 h-20 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Scan to join household</p>
              </div>

              {/* Invite Link */}
              <div className="space-y-2">
                <Label>Invite Link</Label>
                <div className="flex gap-2">
                  <Input 
                    value={inviteLink} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Share via Text Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Link className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>

              {/* Skip Option */}
              <div className="pt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={onSkip}
                >
                  Skip for now - I'll invite later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};