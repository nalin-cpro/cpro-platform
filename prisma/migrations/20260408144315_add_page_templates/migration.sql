-- CreateTable
CREATE TABLE "PageTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pageType" TEXT NOT NULL,
    "layoutHtml" TEXT,
    "layoutCss" TEXT,
    "layoutJson" JSONB,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageTemplate_pageType_status_idx" ON "PageTemplate"("pageType", "status");
