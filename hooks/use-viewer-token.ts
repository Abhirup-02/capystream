import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useViewerToken(hostIdentity: string) {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [identity, setIdentity] = useState('')

    useEffect(() => {
        async function createToken() {
            try {
                const viewerToken = await createViewerToken(hostIdentity)
                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }
                const name = decodedToken.name
                const identity = decodedToken.iss

                if (identity) {
                    setIdentity(identity)
                }

                if (name) {
                    setName(name)
                }
            }
            catch {
                toast.error('Something went wrong')
            }
        }

        createToken()
    }, [hostIdentity])

    return { identity, name, token }
}
