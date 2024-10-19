import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Plus, ChevronUp, ChevronDown, X } from "lucide-react"

type Question = {
    id: number
    question: string
    answer: string
    askedCount: number
}

const initialQuestions: Question[] = [
    {
        id: 1,
        question: "What is React and how does it differ from other JavaScript frameworks? Can you explain its core principles?",
        answer: "React is a JavaScript library for building user interfaces, particularly single-page applications. Unlike full frameworks, React focuses on the view layer and can be easily integrated with other libraries. Its core principles include component-based architecture, declarative programming, and the virtual DOM for efficient updates.",
        askedCount: 42
    },
    {
        id: 2,
        question: "What are React Hooks and how do they improve functional components? Can you name and explain some commonly used hooks?",
        answer: "React Hooks are functions that let you use state and other React features in functional components. They simplify code, make it easier to reuse stateful logic, and eliminate the need for class components in many cases. Common hooks include useState for state management, useEffect for side effects, useContext for context consumption, and useRef for mutable references.",
        askedCount: 28
    },
    // ... (other questions remain unchanged)
]

export default function Component() {
    const [questions, setQuestions] = useState(initialQuestions)
    const [newQuestion, setNewQuestion] = useState({ question: "", answer: "" })
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const incrementCount = (id: number) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, askedCount: q.askedCount + 1 } : q
        ))
    }

    const decrementCount = (id: number) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, askedCount: Math.max(0, q.askedCount - 1) } : q
        ))
    }

    const addQuestion = () => {
        if (newQuestion.question && newQuestion.answer) {
            setQuestions([...questions, {
                id: questions.length + 1,
                ...newQuestion,
                askedCount: 0
            }])
            setNewQuestion({ question: "", answer: "" })
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full shadow-lg w-full sm:w-auto"
                >
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Questions
                </Button>
                <h1 className="bg-primary text-primary-foreground text-2xl sm:text-3xl font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out text-center">
                    Interview Questions
                </h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                    <DialogTrigger asChild>
                        <Button
                            variant="primary"
                            size="lg"
                            className="rounded-full shadow-lg w-full sm:w-auto"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Question
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" className="bg-secondary">
                        <DialogHeader>
                            <DialogTitle>Add New Question</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="question" className="text-right">
                                    Question
                                </Label>
                                <Textarea
                                    id="question"
                                    value={newQuestion.question}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="answer" className="text-right">
                                    Answer
                                </Label>
                                <Textarea
                                    id="answer"
                                    value={newQuestion.answer}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <Button onClick={addQuestion}>Add Question</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {questions.map((q) => (
                    <Card key={q.id} className="overflow-hidden flex flex-col">
                        <CardHeader className="bg-primary text-primary-foreground p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg font-semibold break-words">{q.question}</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-secondary p-3 sm:p-4 flex-grow">
                            <p className="text-secondary-foreground text-sm sm:text-base">{q.answer}</p>
                        </CardContent>
                        <CardFooter className="bg-secondary p-3 sm:p-4 flex justify-between items-center">
                            <div className="text-xs sm:text-sm font-medium">
                                Asked {q.askedCount} times
                            </div>
                            <div className="flex flex-col">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => incrementCount(q.id)}
                                >
                                    <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => decrementCount(q.id)}
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}