-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "featuredImage" TEXT,
ADD COLUMN     "layoutCss" TEXT,
ADD COLUMN     "layoutHtml" TEXT,
ADD COLUMN     "layoutJson" JSONB,
ADD COLUMN     "useLayout" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "layoutCss" TEXT,
ADD COLUMN     "layoutHtml" TEXT,
ADD COLUMN     "layoutJson" JSONB,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "useLayout" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "clientName" TEXT NOT NULL,
    "clientAlias" TEXT,
    "industry" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "city" TEXT,
    "engagementDuration" TEXT,
    "year" INTEGER,
    "serviceId" INTEGER,
    "primaryMetric" TEXT NOT NULL,
    "primaryDelta" TEXT NOT NULL,
    "secondaryMetric" TEXT,
    "secondaryDelta" TEXT,
    "thirdMetric" TEXT,
    "thirdDelta" TEXT,
    "timeToResult" TEXT,
    "challenge" TEXT,
    "approach" TEXT,
    "keyInsight" TEXT,
    "clientQuote" TEXT,
    "clientQuoteAuthor" TEXT,
    "title" TEXT,
    "metaDesc" TEXT,
    "primaryKw" TEXT,
    "featuredImage" TEXT,
    "featuredHome" BOOLEAN NOT NULL DEFAULT false,
    "featuredService" BOOLEAN NOT NULL DEFAULT false,
    "layoutHtml" TEXT,
    "layoutCss" TEXT,
    "layoutJson" JSONB,
    "useLayout" BOOLEAN NOT NULL DEFAULT false,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
