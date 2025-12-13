import { ObjectId } from 'mongodb'

import { getDb } from '../config/mongoClient.js'
import {
  createStudentSchema,
  updateStudentSchema,
  querySchema
} from '../validators/studentValidator.js'

const collectionName = 'students'

const parseId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid student id')
    error.statusCode = 400
    throw error
  }
  return new ObjectId(id)
}

export const createStudent = async (req, res, next) => {
  try {
    const db = await getDb()
    const { value, error } = createStudentSchema.validate(req.body, { abortEarly: false })
    if (error) {
      error.statusCode = 400
      error.details = error.details.map(d => d.message)
      throw error
    }
    if (value.semester !== undefined) value.semester = Number(value.semester)
    if (value.marks !== undefined) value.marks = Number(value.marks)
    if (Array.isArray(value.subjects)) {
      value.subjects = value.subjects.map(subject => ({
        ...subject,
        marks: Number(subject.marks)
      }))
    }
    value.createdAt = new Date()
    value.updatedAt = new Date()

    const result = await db.collection(collectionName).insertOne(value)
    res.status(201).json({ _id: result.insertedId, ...value })
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409
      err.message = 'A student with the same USN already exists.'
    }
    next(err)
  }
}

export const listStudents = async (req, res, next) => {
  try {
    const db = await getDb()
    const { value, error } = querySchema.validate(req.query, { abortEarly: false })
    if (error) {
      error.statusCode = 400
      error.details = error.details.map(d => d.message)
      throw error
    }

    const query = {}
    if (value.minMarks !== undefined || value.maxMarks !== undefined) {
      query.marks = {}
      if (value.minMarks !== undefined) query.marks.$gte = value.minMarks
      if (value.maxMarks !== undefined) query.marks.$lte = value.maxMarks
    }
    if (value.department) {
      query.department = value.department
    }
    if (value.semester !== undefined) {
      query.semester = value.semester
    }

    const options = {}
    if (value.sort) {
      options.sort = { marks: value.sort === 'asc' ? 1 : -1 }
    }
    if (value.limit) {
      options.limit = value.limit
    }

    const students = await db.collection(collectionName)
      .find(query, options)
      .toArray()

    res.json({ count: students.length, results: students })
  } catch (err) {
    next(err)
  }
}

export const getStudent = async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const db = await getDb()
    const student = await db.collection(collectionName).findOne({ _id: id })
    if (!student) {
      const error = new Error('Student not found')
      error.statusCode = 404
      throw error
    }
    res.json(student)
  } catch (err) {
    next(err)
  }
}

export const updateStudent = async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const { value, error } = updateStudentSchema.validate(req.body, { abortEarly: false })
    if (error) {
      error.statusCode = 400
      error.details = error.details.map(d => d.message)
      throw error
    }
    const db = await getDb()
    if (Object.keys(value).length === 0) {
      const err = new Error('At least one field must be provided for update')
      err.statusCode = 400
      throw err
    }
    if (value.semester !== undefined) value.semester = Number(value.semester)
    if (value.marks !== undefined) value.marks = Number(value.marks)
    if (Array.isArray(value.subjects)) {
      value.subjects = value.subjects.map(subject => ({
        ...subject,
        marks: Number(subject.marks)
      }))
    }
    value.updatedAt = new Date()

    const result = await db.collection(collectionName).findOneAndUpdate(
      { _id: id },
      { $set: value },
      { returnDocument: 'after' }
    )
    if (!result.value) {
      const err = new Error('Student not found')
      err.statusCode = 404
      throw err
    }
    res.json(result.value)
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409
      err.message = 'A student with the same USN already exists.'
    }
    next(err)
  }
}

export const deleteStudent = async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const db = await getDb()
    const result = await db.collection(collectionName).deleteOne({ _id: id })
    if (!result.deletedCount) {
      const error = new Error('Student not found')
      error.statusCode = 404
      throw error
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

