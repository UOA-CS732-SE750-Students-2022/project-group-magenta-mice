# Exchange

This application represents the exchange. It is a C++ application.

To develop this repository, please recursively clone:

```bash
git clone --recursive
```

## Building

### Github Actions

The standard release github action builds this application. This will allow
you to run the application and its unit tests with no setup.

1. Go to the Github Actions page for this repository.
2. Go to the most recent action on the main branch.
3. Download the output artifacts (exchange, unit_test are produced by this application).

### SPM

This will build the application with docker. This is generally the recommended
way to build locally.

1. Add SPM and its dependencies to your path (SPM and its dependencies are
   located in `/tools/spm` in this repository).
2. Ensure you have the docker daemon running
3. Run `spm build` and then the desired build script, i.e. `spm build ./release.sh`.

### Manually

1. Install required dependencies. These can be found in the Dockerfile located
   in the spm dependency directory.
2. Build the application with the build script of your choice, i.e. `./debug.sh`.
