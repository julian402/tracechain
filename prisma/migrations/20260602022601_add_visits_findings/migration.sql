-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('AUDITORIA', 'INTERVENTORIA', 'INSPECCION');

-- CreateEnum
CREATE TYPE "FindingType" AS ENUM ('NO_CONFORMIDAD', 'OBSERVACION', 'OPORTUNIDAD');

-- CreateEnum
CREATE TYPE "FindingPriority" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "visitType" "VisitType" NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "actReference" TEXT,
    "auditorEntity" TEXT NOT NULL,
    "auditorName" TEXT NOT NULL,
    "auditedProcess" TEXT,
    "objective" TEXT,
    "responsible" TEXT,
    "commitmentDate" TIMESTAMP(3),
    "correctiveActions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lotId" TEXT,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finding" (
    "id" TEXT NOT NULL,
    "type" "FindingType" NOT NULL,
    "priority" "FindingPriority" NOT NULL,
    "criteria" TEXT,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitId" TEXT NOT NULL,

    CONSTRAINT "Finding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
