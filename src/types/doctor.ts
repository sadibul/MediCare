export interface DoctorData {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorAddress: string;
  doctorExperience: string;
  about: string;
  profileImage: string | null;
  doctorWorkingHours: string | null;
  createdAt: Date;
  updatedAt: Date;
}
