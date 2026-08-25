import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { QuizPlayer } from "@/components/quiz-player";
import { Page } from "@/components/shell";
import { getLesson } from "@/lib/content/lessons";
import { DOMAINS } from "@/lib/content/domains";
import {
  QUESTIONS,
  questionsForDomain,
  questionsForLesson,
} from "@/lib/content/questions";

export const Route = createFileRoute("/quiz/$id")({ component: QuizPage });

function QuizPage() {
  const { id } = Route.useParams();
  const lesson = getLesson(id);
  const domain = DOMAINS.find((d) => d.id === id);

  let questions = questionsForLesson(id);
  let title = lesson?.title ?? "";
  if (domain) {
    questions = questionsForDomain(id);
    title = `Dominio ${domain.code}`;
  }
  if (id === "all") {
    questions = QUESTIONS;
    title = "Banco completo";
  }
  if (!questions.length && !lesson && !domain && id !== "all") throw notFound();

  return (
    <Page>
      <Link to="/practicar" className="text-sm text-muted hover:text-fg">
        ← Practicar
      </Link>
      <div className="mt-8">
        <QuizPlayer quizId={id} title={title} questions={questions} />
      </div>
    </Page>
  );
}
