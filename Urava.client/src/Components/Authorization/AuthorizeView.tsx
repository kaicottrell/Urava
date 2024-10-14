import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const UserContext = createContext({});

interface User {
    email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // add a loading state
    let emptyuser: User = { email: "" };

    const [user, setUser] = useState(emptyuser);

    useEffect(() => {
        let retryCount = 0; // initialize the retry count
        let maxRetries = 5; // set the maximum number of retries
        let delay: number = 100; // set the delay in milliseconds

        function wait(delay: number) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        async function fetchWithRetry(url: string, options: any) {
            try {
                let response = await fetch(url, options);

                if (response.status === 200) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        let j: any = await response.json();
                        setUser({ email: j.email });
                        setAuthorized(true);
                        return response;
                    } else {
                        throw new Error("Expected JSON response");
                    }
                } else if (response.status === 401) {
                    console.log("Unauthorized");
                    return response;
                } else {
                    throw new Error("" + response.status);
                }
            } catch (error) {
                retryCount++;
                if (retryCount > maxRetries) {
                    throw error;
                } else {
                    console.log("Error: " + error.message);
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        fetchWithRetry("/pingauth", {
            method: "GET",
        })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);  // set loading to false when the fetch is done
            });
    }, []);

    if (loading) {
        return (
            <>
                <Spinner animation="grow" variant="secondary" className="fixed-center" />
            </>
        );
    } else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/login" />
                </>
            );
        }
    }
}

export function AuthorizedUser(props: { value: string }) {
    const user: any = React.useContext(UserContext);

    if (props.value === "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;
