-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "externalUserID" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnailURL" TEXT,
    "ingressID" TEXT,
    "serverURL" TEXT,
    "streamKey" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "isChatEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isChatDelayed" BOOLEAN NOT NULL DEFAULT false,
    "isChatFollowersOnly" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followerID" TEXT NOT NULL,
    "followingID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "blockerID" TEXT NOT NULL,
    "blockedID" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_externalUserID_key" ON "User"("externalUserID");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_ingressID_key" ON "Stream"("ingressID");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_userID_key" ON "Stream"("userID");

-- CreateIndex
CREATE INDEX "Stream_userID_idx" ON "Stream"("userID");

-- CreateIndex
CREATE INDEX "Stream_ingressID_idx" ON "Stream"("ingressID");

-- CreateIndex
CREATE INDEX "Follow_followerID_idx" ON "Follow"("followerID");

-- CreateIndex
CREATE INDEX "Follow_followingID_idx" ON "Follow"("followingID");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerID_followingID_key" ON "Follow"("followerID", "followingID");

-- CreateIndex
CREATE INDEX "Block_blockerID_idx" ON "Block"("blockerID");

-- CreateIndex
CREATE INDEX "Block_blockedID_idx" ON "Block"("blockedID");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockerID_blockedID_key" ON "Block"("blockerID", "blockedID");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerID_fkey" FOREIGN KEY ("followerID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingID_fkey" FOREIGN KEY ("followingID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockerID_fkey" FOREIGN KEY ("blockerID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedID_fkey" FOREIGN KEY ("blockedID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
