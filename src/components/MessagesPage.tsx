/**
 * Messages Page - Redesigned
 * Unified page for all conversations: Private Chats + Public Questions
 * Premium Design 2025
 * 
 * Two main tabs:
 * - Chats: Private conversations about listings
 * - Questions: Public Q&A on listings
 */

import { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, MessageSquare, HelpCircle, Send, CheckCheck, Trash2, Mail, MailOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { ReplySheet } from './ReplySheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MessagesPageProps {
  onBack: () => void;
  onChatClick?: (chatId: string) => void;
}

type TabType = 'chats' | 'questions';

interface Chat {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  unreadCount: number;
  listingTitle: string;
  listingImage: string;
}

interface Question {
  id: string;
  question: string;
  askedBy: string;
  askedByAvatar?: string;
  listingTitle: string;
  listingImage: string;
  time: string;
  waitingCount?: number; // Other users also waiting for answer
}

export function MessagesPage({ onBack, onChatClick }: MessagesPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [replySheetOpen, setReplySheetOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  // Mock data - would come from backend  
  const [chatsData, setChatsData] = useState<Chat[]>([
    {
      id: 'chat-1',
      userId: 'user-maria',
      userName: 'María González',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      lastMessage: 'I can do $1,800. That\'s my lowest price.',
      time: '2h ago',
      unread: true,
      unreadCount: 1,
      listingTitle: 'MacBook Pro 14" M2 - Like New',
      listingImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    },
    {
      id: 'chat-2',
      userId: 'user-carlos',
      userName: 'Carlos Ruiz',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      lastMessage: 'Sounds good 👍',
      time: '2d ago',
      unread: false,
      unreadCount: 0,
      listingTitle: 'Mountain Bike Trek X-Caliber',
      listingImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
    },
    {
      id: 'chat-3',
      userId: 'user-sofia',
      userName: 'Sofía Martínez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      lastMessage: '3 batteries, 64GB SD card, and a camera bag.',
      time: '5h ago',
      unread: true,
      unreadCount: 1,
      listingTitle: 'Canon EOS R6 + 24-105mm Lens',
      listingImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
    },
  ]);

  const questions: Question[] = [
    {
      id: 'q1',
      question: 'Does it come with the charger and original box?',
      askedBy: '@tech_buyer',
      askedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      listingTitle: 'MacBook Pro M1',
      listingImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      time: '5h ago',
      waitingCount: 3,
    },
    {
      id: 'q2',
      question: 'Can you ship to Santiago?',
      askedBy: '@maria_s',
      askedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      listingTitle: 'Vintage Camera',
      listingImage: 'https://images.unsplash.com/photo-1606980707919-84b2c6d99e69?w=400',
      time: '1d ago',
    },
    {
      id: 'q3',
      question: 'Is the battery health still good?',
      askedBy: '@iphone_collector',
      listingTitle: 'iPhone 14 Pro Max',
      listingImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
      time: '2d ago',
      waitingCount: 1,
    },
  ];

  const unreadChatsCount = chatsData.filter(c => c.unread).length;
  const unansweredQuestionsCount = questions.length;

  const filteredChats = chatsData.filter(chat => 
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.askedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    if (onChatClick) {
      onChatClick(chatId);
    } else {
      toast.info(`Opening chat ${chatId}...`);
    }
  };

  const handleReplyQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    console.log('🔍 handleReplyQuestion called:', { questionId, question, found: !!question });
    if (question) {
      setSelectedQuestion(question);
      setReplySheetOpen(true);
      console.log('✅ Opening ReplySheet for question:', question.id);
    } else {
      console.error('❌ Question not found:', questionId);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    setChatToDelete(chatId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      setChatsData(prevChats => prevChats.filter(chat => chat.id !== chatToDelete));
      setDeleteDialogOpen(false);
      setChatToDelete(null);
      toast.success('Conversation deleted');
    }
  };

  const handleToggleRead = (chatId: string, currentState: boolean) => {
    setChatsData(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, unread: !currentState, unreadCount: currentState ? 0 : 1 }
          : chat
      )
    );
    toast.success(currentState ? 'Marked as read' : 'Marked as unread');
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="h-[52px] px-4 flex items-center justify-between border-b bg-background shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">Messages</h1>
        <button className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b bg-background shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages or questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b bg-background shrink-0">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="chats" className="relative">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Chats
              {unreadChatsCount > 0 && (
                <Badge variant="destructive" className="ml-1.5 h-4 px-1.5 text-[9px]">
                  {unreadChatsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="questions" className="relative">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              Questions
              {unansweredQuestionsCount > 0 && (
                <Badge variant="default" className="ml-1.5 h-4 px-1.5 text-[9px]">
                  {unansweredQuestionsCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Chats Tab Content */}
        <TabsContent value="chats" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-2">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-medium mb-1">No chats found</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {searchQuery ? 'Try a different search term' : 'Start a conversation!'}
                  </p>
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`w-full p-3 rounded-xl border transition-all hover:shadow-md ${ 
                      chat.unread 
                        ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* User Avatar + Listing Image Combined */}
                      <button
                        onClick={() => handleChatClick(chat.id)}
                        className="relative w-12 h-12 flex-shrink-0"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          <img 
                            src={chat.listingImage} 
                            alt={chat.listingTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Avatar className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-background">
                          <AvatarImage src={chat.userAvatar} />
                          <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                            {chat.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </button>

                      {/* Content */}
                      <button
                        onClick={() => handleChatClick(chat.id)}
                        className="flex-1 min-w-0 text-left"
                      >
                        {/* Header: User + Time + Unread */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold truncate">
                            {chat.userName}
                          </span>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                            {chat.unread && (
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>

                        {/* Subject line */}
                        <p className="text-[11px] text-muted-foreground mb-1.5 truncate">
                          Re: <span className="font-medium text-foreground/70">{chat.listingTitle}</span>
                        </p>

                        {/* Attribution + Message */}
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-medium text-primary">
                            @{chat.userName.replace(' ', '').toLowerCase()} said:
                          </p>
                          <p className={`text-xs truncate ${chat.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            "{chat.lastMessage}"
                          </p>
                        </div>
                      </button>

                      {/* Actions Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleRead(chat.id, chat.unread);
                            }}
                          >
                            {chat.unread ? (
                              <>
                                <MailOpen className="w-4 h-4 mr-2" />
                                Mark as read
                              </>
                            ) : (
                              <>
                                <Mail className="w-4 h-4 mr-2" />
                                Mark as unread
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Questions Tab Content */}
        <TabsContent value="questions" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-2">
              {filteredQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <HelpCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-medium mb-1">No questions found</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {searchQuery ? 'Try a different search term' : 'You have no pending questions'}
                  </p>
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="w-full p-3 rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800"
                  >
                    <div className="flex gap-3">
                      {/* User Avatar + Listing Image Combined */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          <img 
                            src={question.listingImage} 
                            alt={question.listingTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {question.askedByAvatar && (
                          <Avatar className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-background">
                            <AvatarImage src={question.askedByAvatar} />
                            <AvatarFallback className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                              {question.askedBy.replace('@', '').slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header: User + Time + Waiting */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold truncate">
                              {question.askedBy}
                            </span>
                            {question.waitingCount && question.waitingCount > 0 && (
                              <span className="flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-500 shrink-0">
                                <HelpCircle className="w-3 h-3" />
                                +{question.waitingCount}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {question.time}
                          </span>
                        </div>

                        {/* Subject line */}
                        <p className="text-[11px] text-muted-foreground mb-1.5 truncate">
                          Re: <span className="font-medium text-foreground/70">{question.listingTitle}</span>
                        </p>

                        {/* Attribution + Question */}
                        <div className="space-y-0.5 mb-2">
                          <p className="text-[10px] font-medium text-amber-600 dark:text-amber-500">
                            {question.askedBy} asked:
                          </p>
                          <p className="text-xs text-foreground leading-relaxed line-clamp-2">
                            "{question.question}"
                          </p>
                        </div>

                        {/* Action */}
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleReplyQuestion(question.id)}
                            className="h-7 px-3 text-[11px]"
                          >
                            <Send className="w-3 h-3 mr-1.5" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Empty State Footer Hint */}
      {activeTab === 'chats' && filteredChats.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30 text-center shrink-0">
          <p className="text-xs text-muted-foreground">
            Tap any chat to open the conversation
          </p>
        </div>
      )}

      {activeTab === 'questions' && filteredQuestions.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30 text-center shrink-0">
          <p className="text-xs text-muted-foreground">
            Answers are public and visible to everyone
          </p>
        </div>
      )}

      {/* Reply Sheet */}
      <ReplySheet
        open={replySheetOpen}
        onOpenChange={setReplySheetOpen}
        question={selectedQuestion?.question || ''}
        askedBy={selectedQuestion?.askedBy || ''}
        askedAt={selectedQuestion?.time || ''}
        listingTitle={selectedQuestion?.listingTitle || ''}
        listingImage={selectedQuestion?.listingImage}
        questionId={selectedQuestion?.id}
        waitingCount={selectedQuestion?.waitingCount}
        onSubmit={async (answer) => {
          console.log('Publishing answer:', answer, 'for question:', selectedQuestion?.id);
          // TODO: Backend call to publish answer
        }}
      />

      {/* Delete Chat Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the chat from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteChat}>
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default MessagesPage;