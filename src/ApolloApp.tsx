import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Outlet, useNavigate } from "react-router-dom";

import { getJwt, logout } from "./utils/Auth";

export default function ApolloApp() {
  const navigate = useNavigate();

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        alert(`Graphql Error ${error.message}`);
        if (error.extensions.code === "UNAUTHENTICATED") {
          logout()
          navigate("/login");
        }
      });
    }
  });

  const httpLink = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000" }),
  ]);

  const authLink = setContext((_, { headers }) => {
    const token = getJwt();

    return {
      headers: {
        ...headers,
        ...(token && { authorization: token }),
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });

  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  );
}
