// src/components/layout/Header.tsx
import { Bell, SunMoon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function Header() {
  return (
    <header className="w-full h-14 px-6 flex items-center justify-between border-b bg-background">
      {/* Left: Logo & App Name */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold tracking-tight">📊 DashBuilder</span>
        <span className="text-muted-foreground">Collaborative Dashboard</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon">
          <SunMoon className="h-5 w-5" />
        </Button>

        {/* Notification */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Avatar with Dropdown */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="user" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

export default Header;
