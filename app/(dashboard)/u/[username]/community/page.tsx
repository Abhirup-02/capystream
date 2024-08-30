import { getBlockedUsers } from "@/lib/block-service."
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { format } from "date-fns"

export default async function CommunityPage() {

    const blockedUsers = await getBlockedUsers()

    const formattedData = blockedUsers.map((blockedUser) => ({
        ...blockedUser,
        userID: blockedUser.blocked.id,
        imageURL: blockedUser.blocked.imageURL,
        username: blockedUser.blocked.username,
        createdAt: format(new Date(blockedUser.blocked.createdAt), "dd/MM/yyyy")
    }))


    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Community Settings
                </h1>
            </div>
            <DataTable columns={columns} data={formattedData} />
        </div>
    )
}
