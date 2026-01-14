import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { QuestionService } from '../services/question.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit, OnDestroy {
  //SUCCESS MESSAGE
  successMessage: string = '';

  // ===== DATA =====
  selectedSubjectId: string = '';
  questions: any[] = [];
  currentQuestion: any = null;

  // ===== QUIZ STATE =====
  selectedOption: string | null = null;
  isCorrect: boolean | null = null;

  // ===== AUTO ROTATION =====
  currentIndex = 0;
  intervalId: any;

  // ===== ADMIN =====
  isAdmin = false;

  // ===== ADD QUESTION =====
  showAddForm = false;
  newQuestion = {
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  };

  constructor(
    private sidebarService: SidebarService,
    private questionService: QuestionService,
    private auth: AuthService
  ) {}

  // =============================
  // INIT
  // =============================
  ngOnInit(): void {
    // check admin role
    this.isAdmin = this.auth.isAdmin();
    console.log('IS ADMIN:', this.isAdmin);

    // listen to subject selection
    this.sidebarService.selectedCategory$.subscribe((subjectId) => {
      if (!subjectId) return;

      this.selectedSubjectId = subjectId;
      this.loadQuestions(subjectId);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // =============================
  // LOAD QUESTIONS
  // =============================
  loadQuestions(subjectId: string) {
    this.questionService.getQuestionsBySubject(subjectId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.currentIndex = 0;
        this.setCurrentQuestion();
      },
      error: (err) => {
        console.error('Failed to load questions', err);
      },
    });
  }

  setCurrentQuestion() {
    this.currentQuestion = this.questions[this.currentIndex] || null;
    this.resetAnswerState();
    this.startAutoChange();
  }

  // =============================
  // AUTO CHANGE
  // =============================
  startAutoChange() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.questions.length === 0) return;

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.questions.length;

      this.currentQuestion = this.questions[this.currentIndex];
      this.resetAnswerState();
    }, 10000); // 10 seconds
  }

  // =============================
  // OPTION CLICK
  // =============================
  selectOption(option: string) {
    if (this.selectedOption) return;

    this.selectedOption = option;
    this.isCorrect = option === this.currentQuestion.correct_answer;
  }

  resetAnswerState() {
    this.selectedOption = null;
    this.isCorrect = null;
  }

  // =============================
  // ADMIN: DELETE
  // =============================
  onDelete(question: any) {
    this.questionService.deleteQuestion(question.id).subscribe({
      next: () => {
        this.questions = this.questions.filter((q) => q.id !== question.id);
        this.currentIndex = 0;
        this.setCurrentQuestion();
      },
      error: (err) => {
        console.error('Delete failed', err);
      },
    });
  }

  // =============================
  // ADMIN: ADD QUESTION
  // =============================
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;

    //Auto-rotation pauses while typing
    if (this.showAddForm && this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (!this.showAddForm) {
      this.startAutoChange();
    }
  }

  submitQuestion() {
    const payload = {
      subject_id: this.selectedSubjectId,
      ...this.newQuestion,
    };

    if (!this.selectedSubjectId) {
      alert('No subject selected');
      return;
    }

    if (!this.newQuestion.question || !this.newQuestion.correct_answer) {
      alert('Please fill all required fields');
      return;
    }

    this.questionService.addQuestion(payload).subscribe({
      next: () => {
        this.loadQuestions(this.selectedSubjectId);
        this.showAddForm = false;
        this.resetForm();
        this.successMessage = 'Question added successfully ✔️';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Add question failed', err);
      },
    });
  }

  resetForm() {
    this.newQuestion = {
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: '',
    };
  }
}
