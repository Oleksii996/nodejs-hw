import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати усі нотатки
export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

// Отримати одного студента за id
export const getStudentById = async (req, res) => {
  const { notetId } = req.params;
  const note = await Note.findById(noteId);

  if (!student) {
    return res.status(404).json({ message: 'Notes not found' });
  }

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

// Створити нового студента
export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

// Видалити студента
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({
    _id: studentId,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

// Оновити студента
export const updateStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndUpdate(
    { _id: studentId }, // Шукаємо по id
    req.body,
    { returnDocument: 'after' }, // повертаємо оновлений документ
  );

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};
