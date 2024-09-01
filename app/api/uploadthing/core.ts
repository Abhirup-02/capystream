import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const self = await getSelf()

            return { user: self }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.stream.update({
                where: {
                    userID: metadata.user.id
                },
                data: {
                    thumbnailURL: file.url
                }
            })
            await db.$disconnect()

            return { fileURL: file.url }
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
