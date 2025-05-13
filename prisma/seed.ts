import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const doctors = [
    {
      doctorName: 'Doctor 1',
      doctorSpecialty: 'Cardiology',
      doctorEmail: 'doctor1@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 123-4567',
      doctorAddress: '123 Medical Center Dr, Suite 101, Boston, MA 02115',
      doctorExperience: '15 years',
    },
    {
      doctorName: 'Doctor 2',
      doctorSpecialty: 'Dermatology',
      doctorEmail: 'doctor2@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 234-5678',
      doctorAddress: '456 Healthcare Ave, Suite 202, New York, NY 10001',
      doctorExperience: '8 years',
    },
    {
      doctorName: 'Doctor 3',
      doctorSpecialty: 'Pediatrics',
      doctorEmail: 'doctor3@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 345-6789',
      doctorAddress: '789 Wellness Blvd, Suite 303, Chicago, IL 60601',
      doctorExperience: '12 years',
    },
    {
      doctorName: 'Doctor 4',
      doctorSpecialty: 'Orthopedics',
      doctorEmail: 'doctor4@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 456-7890',
      doctorAddress: '321 Health Park, Suite 404, Seattle, WA 98101',
      doctorExperience: '20 years',
    },
    {
      doctorName: 'Doctor 5',
      doctorSpecialty: 'Neurology',
      doctorEmail: 'doctor5@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 567-8901',
      doctorAddress: '654 Care Lane, Suite 505, Austin, TX 78701',
      doctorExperience: '10 years',
    },
    {
      doctorName: 'Doctor 6',
      doctorSpecialty: 'Psychiatry',
      doctorEmail: 'doctor6@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 678-9012',
      doctorAddress: '987 Medical Mall, Suite 606, Denver, CO 80202',
      doctorExperience: '7 years',
    },
    {
      doctorName: 'Doctor 7',
      doctorSpecialty: 'Ophthalmology',
      doctorEmail: 'doctor7@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 789-0123',
      doctorAddress: "147 Doctor's Row, Suite 707, Miami, FL 33101",
      doctorExperience: '13 years',
    },
    {
      doctorName: 'Doctor 8',
      doctorSpecialty: 'ENT',
      doctorEmail: 'doctor8@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 890-1234',
      doctorAddress: '258 Clinic Court, Suite 808, Phoenix, AZ 85001',
      doctorExperience: '9 years',
    },
    {
      doctorName: 'Doctor 9',
      doctorSpecialty: 'Gynecology',
      doctorEmail: 'doctor9@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 901-2345',
      doctorAddress: '369 Hospital Highway, Suite 909, Portland, OR 97201',
      doctorExperience: '16 years',
    },
    {
      doctorName: 'Doctor 10',
      doctorSpecialty: 'Urology',
      doctorEmail: 'doctor10@gmail.com',
      doctorPassword: 'x',
      doctorPhone: '+1 (555) 012-3456',
      doctorAddress: '741 Treatment Trail, Suite 1010, Atlanta, GA 30301',
      doctorExperience: '11 years',
    },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
