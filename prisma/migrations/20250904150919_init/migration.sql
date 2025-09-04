-- CreateTable
CREATE TABLE "public"."todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
