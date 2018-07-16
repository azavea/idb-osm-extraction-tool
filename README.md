# IDB OSM Extraction Tool

Friendly front-end for querying OSM features around Guyana and extracting as a Shapefile.

### Requirements

* Vagrant 1.8+
* VirtualBox 4.3
* Ansible 2.1+

### Getting Started

Install the application and all required dependencies.

```sh
./scripts/setup.sh
```

#### Development

Rebuild Docker images and run application.

```sh
vagrant up
vagrant ssh
./scripts/update.sh
./scripts/server.sh
```

### Ports

| Service            | Port                            |
| ------------------ | ------------------------------- |
| Webpack Dev Server | [`4567`](http://localhost:4567) |

### Testing

```
./scripts/test.sh
```

### Scripts

| Name           | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `cibuild`      | Build project for CI                                          |
| `clean`        | Free disk space by cleaning up dangling Docker images         |
| `console`      | Run interactive shell inside application container            |
| `lint`         | Lint source code                                              |
| `server`       | Run Docker Compose services                                   |
| `setup`        | Provision Vagrant VM and run `update.sh`                      |
| `test`         | Run unit tests                                                |
| `update`       | Build Docker images                                           |

### Adding NPM Packages

To add a new NPM package to the project:

- Manually add the package to the project's `package.json` file, ensuring that you
pin it to a specific version.
- Add the package to the `vendor` array in `webpack.common.config.js`.
- Run `./scripts/update` in the VM.
- Commit the changes to the following files to git:
    - `package.json`
    - `yarn.lock`
    - `webpack.common.config.js`

#### Notes

* We usually pin packages to a specific version to minimize build errors.
* For packages in the regular/non-dev dependencies section of `package.json`,
  manually add the package name to the `vendor` array in `webpack.config.json`
