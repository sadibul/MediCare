-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "dosage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorName" TEXT NOT NULL,
    "doctorSpecialty" TEXT NOT NULL,
    "doctorEmail" TEXT NOT NULL,
    "doctorPhone" TEXT NOT NULL,
    "doctorAddress" TEXT NOT NULL,
    "doctorExperience" TEXT NOT NULL,
    "profileImage" TEXT,
    "doctorWorkingHours" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorEmail_key" ON "Doctor"("doctorEmail");
