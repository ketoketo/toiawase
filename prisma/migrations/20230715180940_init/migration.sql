-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Toiawase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Toiawase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberToiawase" (
    "memberId" INTEGER NOT NULL,
    "toiawaseId" INTEGER NOT NULL,
    "junban" BIGSERIAL NOT NULL,

    CONSTRAINT "MemberToiawase_pkey" PRIMARY KEY ("junban")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_name_key" ON "Member"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Toiawase_name_key" ON "Toiawase"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MemberToiawase_memberId_toiawaseId_key" ON "MemberToiawase"("memberId", "toiawaseId");

-- AddForeignKey
ALTER TABLE "MemberToiawase" ADD CONSTRAINT "MemberToiawase_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberToiawase" ADD CONSTRAINT "MemberToiawase_toiawaseId_fkey" FOREIGN KEY ("toiawaseId") REFERENCES "Toiawase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
