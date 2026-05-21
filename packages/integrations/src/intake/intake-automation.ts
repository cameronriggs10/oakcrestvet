import type { EmailChannel } from "../notifications";

export interface IntakePetInfo {
  name: string;
  species: string;
  breed?: string;
  age?: string;
  sex?: string;
  weight?: string;
}

export interface IntakeOwnerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface IntakeSubmission {
  owner: IntakeOwnerInfo;
  pet: IntakePetInfo;
  reasonForVisit: string;
  currentMedications?: string;
  allergies?: string;
  insuranceProvider?: string;
  emergencyContact?: string;
  additionalNotes?: string;
  submittedAtIso?: string;
}

export interface IntakeEmailResult {
  subject: string;
  text: string;
  html: string;
}

export function formatIntakeSubmissionEmail(submission: IntakeSubmission): IntakeEmailResult {
  const submittedAt = submission.submittedAtIso
    ? new Date(submission.submittedAtIso)
    : new Date();

  const subject = `New Patient Intake - ${submission.pet.name} (${submission.owner.lastName})`;

  const text = [
    `New intake form submission received at ${submittedAt.toISOString()}`,
    "",
    `Owner: ${submission.owner.firstName} ${submission.owner.lastName}`,
    `Email: ${submission.owner.email}`,
    `Phone: ${submission.owner.phone}`,
    submission.owner.address ? `Address: ${submission.owner.address}` : "",
    "",
    `Pet: ${submission.pet.name}`,
    `Species: ${submission.pet.species}`,
    submission.pet.breed ? `Breed: ${submission.pet.breed}` : "",
    submission.pet.age ? `Age: ${submission.pet.age}` : "",
    submission.pet.sex ? `Sex: ${submission.pet.sex}` : "",
    submission.pet.weight ? `Weight: ${submission.pet.weight}` : "",
    "",
    `Reason for visit: ${submission.reasonForVisit}`,
    submission.currentMedications ? `Current medications: ${submission.currentMedications}` : "",
    submission.allergies ? `Allergies: ${submission.allergies}` : "",
    submission.insuranceProvider ? `Insurance provider: ${submission.insuranceProvider}` : "",
    submission.emergencyContact ? `Emergency contact: ${submission.emergencyContact}` : "",
    submission.additionalNotes ? `Additional notes: ${submission.additionalNotes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = text.replace(/\n/g, "<br />");

  return { subject, text, html };
}

export async function sendIntakeToClinic(params: {
  emailChannel: EmailChannel;
  clinicEmail: string;
  submission: IntakeSubmission;
}): Promise<void> {
  const formatted = formatIntakeSubmissionEmail(params.submission);

  await params.emailChannel.send({
    to: params.clinicEmail,
    subject: formatted.subject,
    text: formatted.text,
    html: formatted.html,
  });
}
