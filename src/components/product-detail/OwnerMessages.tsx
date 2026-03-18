import { Mail } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import type { ExtendedProduct } from "./types";

interface OwnerMessagesProps {
  conversations?: ExtendedProduct['conversations'];
  isOwner?: boolean;
}

export function OwnerMessages({ conversations, isOwner = false }: OwnerMessagesProps) {
  if (!isOwner || !conversations || conversations.length === 0) return null;

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <div className="px-[var(--space-lg)] py-[var(--space-sm)]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="messages">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Messages ({conversations.length})</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs h-4 px-1.5 ml-1">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conversations.slice(0, 3).map((conv) => (
                <button
                  key={conv.id}
                  className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {conv.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{conv.userName}</span>
                        {conv.unread && (
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </div>
                      <div className="text-muted-foreground truncate">{conv.lastMessage}</div>
                      <div className="text-muted-foreground">{conv.time}</div>
                    </div>
                  </div>
                </button>
              ))}
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                View all messages →
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
