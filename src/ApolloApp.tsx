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
import { getAccessToken, logout } from "./utils/AuthHelper";

export default function ApolloApp() {
  const navigate = useNavigate();

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        if (error.extensions.code === "UNAUTHENTICATED") {
          logout();
          navigate("/login");
        } else {
          alert(`Graphql Error ${error.message}`);
        }
      });
    }
  });

  const httpLink = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000" }),
  ]);

  const authLink = setContext((_, { headers }) => {
    const token = getAccessToken();

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
