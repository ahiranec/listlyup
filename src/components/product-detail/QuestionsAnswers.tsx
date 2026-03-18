import { MessageSquare, MessageCircle, ThumbsUp } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import type { ExtendedProduct } from "./types";
import { ActionButtons } from "../actions/ActionButtons"; // ✅ MIGRATION: Import ActionButtons

interface QuestionsAnswersProps {
  questions?: ExtendedProduct['questions'];
  isOwner?: boolean;
  onAnswerClick?: (question: ExtendedProduct['questions'][0]) => void;
  onEditReply?: (question: ExtendedProduct['questions'][0]) => void; // ✅ FIX: Edit reply handler
  onAskQuestionClick?: () => void; // ✅ FIX: Ask question handler
}

export function QuestionsAnswers({ questions, isOwner = false, onAnswerClick, onEditReply, onAskQuestionClick }: QuestionsAnswersProps) {
  if (!questions || questions.length === 0) return null;

  const unansweredCount = questions.filter(q => !q.answer).length;

  return (
    <div className="px-[var(--space-lg)] py-[var(--space-sm)]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="qa">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Questions & Answers ({questions.length})</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {/* Owner alert for unanswered questions */}
              {isOwner && unansweredCount > 0 && (
                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  ⚠️ {unansweredCount} question(s) need your reply
                </div>
              )}

              {/* Questions list */}
              <div className="space-y-3">
                {questions.slice(0, 3).map((qa) => (
                  <div key={qa.id} className="space-y-2 text-xs">
                    {/* Question */}
                    <div className="space-y-1">
                      <div className="font-medium">Q: {qa.question}</div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>👤 {qa.askedBy}</span>
                        <span>•</span>
                        <span>{qa.askedAt}</span>
                        {/* ❌ MVP: Q&A helpful/upvotes removed - no ranking system */}
                      </div>
                    </div>
                    
                    {/* Answer */}
                    {qa.answer ? (
                      <div className="pl-4 border-l-2 border-primary space-y-1">
                        <div className="text-muted-foreground">A: {qa.answer.text}</div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>🏪 Seller</span>
                          <span>•</span>
                          <span>{qa.answer.answeredAt}</span>
                          {/* ❌ MVP: Answer helpful/upvotes removed - no ranking system */}
                        </div>
                        {isOwner && (
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => onEditReply?.(qa)}>
                            Edit Reply
                          </Button>
                        )}
                      </div>
                    ) : isOwner ? (
                      <div className="pl-4">
                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onAnswerClick?.(qa)}>
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply Now →
                        </Button>
                      </div>
                    ) : (
                      <div className="pl-4 text-muted-foreground">
                        ⏳ Waiting for seller reply...
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* See all button */}
              {questions.length > 3 && (
                <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                  See all {questions.length} questions →
                </Button>
              )}

              {/* Ask question button */}
              {/* ✅ MIGRATION: Use ActionButtons instead of manual button */}
              <ActionButtons
                context="product-detail"
                entity={{ type: 'listing' as const, id: 'qa-section' }}
                actionIds={['ask-question']}
                layout="horizontal"
                isOwner={false}
                className="w-full"
                customHandlers={{
                  'ask-question': onAskQuestionClick,
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}