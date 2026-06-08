import { lazy } from "react";

const ProfileRouter = lazy(() => import("./components/profile/ProfileRouter"));
const SettingsRouter = lazy(() => import("./components/settings/SettingsRouter"));
const MessagesPage = lazy(() => import("./components/MessagesPage"));

interface AppStandaloneRendererProps {
  currentView: "profile" | "settings" | "messages";
  onNavigateToHome: () => void;
  onNavigateToChat: (chatId: string) => void;
  /** When true (desktop Account Shell), hubs hide their redundant top Back button. */
  embedded?: boolean;
}

export function AppStandaloneRenderer({
  currentView,
  onNavigateToHome,
  onNavigateToChat,
  embedded,
}: AppStandaloneRendererProps) {
  if (currentView === "profile") {
    return <ProfileRouter onBack={onNavigateToHome} embedded={embedded} />;
  }

  if (currentView === "settings") {
    return <SettingsRouter onClose={onNavigateToHome} embedded={embedded} />;
  }
  
  if (currentView === "messages") {
    return <MessagesPage onBack={onNavigateToHome} onChatClick={onNavigateToChat} />;
  }

  return null;
}
