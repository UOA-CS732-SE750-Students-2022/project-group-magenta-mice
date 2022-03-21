# SPM - Simulate Package Manager

SPM is a tool for building and managing our CPP applications. In future scope,
it will act as a way to install and manage our CPP libraries.

## Installation

- SPM requires docker to be installed, and the docker daemon to be running.
- SPM requires `node.js` to be installed.

Add `spm` to a directory in your path. `spm-deps` should be located adjacent to your path.

## Commands

### Building

```bash
spm build <build-script>

# For example
spm build ./debug.sh
```
