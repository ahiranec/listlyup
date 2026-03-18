import { lazy } from "react";

const ProfileRouter = lazy(() => import("./components/profile/ProfileRouter"));
const SettingsRouter = lazy(() => import("./components/settings/SettingsRouter"));
const MessagesPage = lazy(() => import("./components/MessagesPage"));

interface AppStandaloneRendererProps {
  currentView: "profile" | "settings" | "messages";
  onNavigateToHome: () => void;
  onNavigateToChat: (chatId: string) => void;
}

export function AppStandaloneRenderer({ 
  currentView, 
  onNavigateToHome, 
  onNavigateToChat 
}: AppStandaloneRendererProps) {
  if (currentView === "profile") {
    return <ProfileRouter onBack={onNavigateToHome} />;
  }
  
  if (currentView === "settings") {
    return <SettingsRouter onClose={onNavigateToHome} />;
  }
  
  if (currentView === "messages") {
    return <MessagesPage onBack={onNavigateToHome} onChatClick={onNavigateToChat} />;
  }

  return null;
}
