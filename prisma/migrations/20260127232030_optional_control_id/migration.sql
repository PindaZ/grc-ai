-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgentAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "controlId" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AgentAction_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AgentAction" ("controlId", "description", "id", "reasoning", "status", "timestamp", "title", "type") SELECT "controlId", "description", "id", "reasoning", "status", "timestamp", "title", "type" FROM "AgentAction";
DROP TABLE "AgentAction";
ALTER TABLE "new_AgentAction" RENAME TO "AgentAction";
CREATE TABLE "new_AgentEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "controlId" TEXT,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    CONSTRAINT "AgentEvent_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AgentEvent" ("controlId", "details", "id", "message", "timestamp", "type") SELECT "controlId", "details", "id", "message", "timestamp", "type" FROM "AgentEvent";
DROP TABLE "AgentEvent";
ALTER TABLE "new_AgentEvent" RENAME TO "AgentEvent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
