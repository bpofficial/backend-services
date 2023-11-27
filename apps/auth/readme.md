# Connections
## Username-Password
Used for storing username & password on an `account` of some given `user` within local databases.
### Grants
- `password`
  * Expects `username` and `password` FormData values in a POST request and a `client_id` pointing to the `Username-Password` connection in use.

## OpenID Connect
Used for connecting an `account` for some given `user` with a 3rd Party OpenID provider such as google or facebook etc.
### Grants
- `authorization_code`
  * Expects a `client_id` pointing to the `OIDC` connection in use and a `redirect_uri`. Optionally accepts `code_challenge`, `state` and `scope` to forward to the provider also.

### Features
- `PKCE` for `authorization_code` flow