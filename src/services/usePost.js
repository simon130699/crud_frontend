import { useState } from "react";

export const usePost = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Error al enviar los datos");

            const result = await response.json();
            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return { postData, isLoading, error };
};
export default usePost;