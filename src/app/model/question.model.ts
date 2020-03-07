export class QuestionModel {
  id: number;
  userId: number;
  customerId: number;
  customerName: string;
  question: string;
  slug: string;
  publishedAt: string;
  status: number;
  diseaseId: number;
  categoryId: number;
  categoryName: string;
  tags: string;
  age: number;
  gender: number;
  highlight: number;
  isDelete: number;
  visible: number;
  createdAt: number;
  updatedAt: number;
  answer: any;
}
