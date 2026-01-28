-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" INTEGER NOT NULL,
    "likelihood" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Control" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "automationStatus" TEXT,
    "lastCheck" DATETIME,
    "confidenceScore" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ControlActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "controlId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    CONSTRAINT "ControlActivity_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "linkedControlId" TEXT,
    "assignedTo" TEXT,
    "extractedData" JSONB,
    "matchScore" REAL,
    CONSTRAINT "Evidence_linkedControlId_fkey" FOREIGN KEY ("linkedControlId") REFERENCES "Control" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgentAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "controlId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AgentAction_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgentEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "controlId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    CONSTRAINT "AgentEvent_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AutomationLogEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skillId" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "details" TEXT
);

-- CreateTable
CREATE TABLE "_RequirementToRisk" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RequirementToRisk_A_fkey" FOREIGN KEY ("A") REFERENCES "Requirement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RequirementToRisk_B_fkey" FOREIGN KEY ("B") REFERENCES "Risk" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RiskToControl" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RiskToControl_A_fkey" FOREIGN KEY ("A") REFERENCES "Control" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RiskToControl_B_fkey" FOREIGN KEY ("B") REFERENCES "Risk" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RequirementToRisk_AB_unique" ON "_RequirementToRisk"("A", "B");

-- CreateIndex
CREATE INDEX "_RequirementToRisk_B_index" ON "_RequirementToRisk"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RiskToControl_AB_unique" ON "_RiskToControl"("A", "B");

-- CreateIndex
CREATE INDEX "_RiskToControl_B_index" ON "_RiskToControl"("B");
