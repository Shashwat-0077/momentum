import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetAllDatabases = () => {
    const query = useQuery({
        queryKey: ["all-databases"],
        queryFn: async () => {
            const response = await client.api.notion["get-databases"]["$get"]();

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const { databases } = await response.json();
            return databases;
        },
    });

    return query;
};
