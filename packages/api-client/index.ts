export * from '@oakcrest/db'

export type AppointmentRequest = {
  petId: string
  serviceId: string
  startTime: Date
  endTime: Date
}

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type IntakeFormSubmission = {
  firstName: string
  lastName: string
  email: string
  phone: string
  petName: string
  petSpecies: string
  reasonForVisit: string
}
