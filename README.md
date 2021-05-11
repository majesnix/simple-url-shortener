# SimpleUrlShortener

This project was generated using [Nx](https://nx.dev).

To use this application, an Auth0 instance needs to be setup.

This includes the following steps:

- Create a Custom API
- Create a Single Page App
- Activate the Auth0 Authorization Extensions

You also need to create 2 permissions in the Authorization settings, as well as in the User settings.

- delete:urls
- read:urls

These are admin permissions.

The frontend needs some further cleanup (especially component wise), right now it is a mixture of scss and styled-components with css, which is not the cleanest. I will probably clean this up in soon™

Also some things need to be added to the env vars, since this also for a more dynamic deployment.
