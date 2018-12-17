# IDB OSM Extraction Tool

Friendly front-end for querying OSM features around Guyana and extracting as a Shapefile.

### Requirements

* Vagrant 1.8+
* VirtualBox 4.3
* Ansible 2.1+

### Getting Started

Install the application and all required dependencies.

```sh
./scripts/setup
```

#### Development

Rebuild Docker images and run application.

```sh
vagrant up
vagrant ssh
./scripts/update
./scripts/server
```

### Ports

| Service            | Port                            |
| ------------------ | ------------------------------- |
| Webpack Dev Server | [`4567`](http://localhost:4567) |

### Testing

```
./scripts/test
```

### Scripts

| Name           | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `cibuild`      | Build project for CI                                          |
| `clean`        | Free disk space by cleaning up dangling Docker images         |
| `console`      | Run interactive shell inside application container            |
| `lint`         | Lint source code                                              |
| `server`       | Run Docker Compose services                                   |
| `setup`        | Provision Vagrant VM and run `update`                         |
| `test`         | Run unit tests                                                |
| `update`       | Build Docker images                                           |

### Adding NPM Packages

To add a new NPM package to the project:

- Manually add the package to the project's `package.json` file, ensuring that you
pin it to a specific version.
- Run `./scripts/update` in the VM.
- Commit the changes to the following files to git:
    - `package.json`
    - `yarn.lock`
- We usually pin packages to a specific version to minimize build errors.

### Creating a Release with Git Flow

This project uses git flow for releases. You can [find the latest version of
`git-flow` to install here](https://github.com/petervanderdoes/gitflow-avh).

Once it's installed, you'll need to enable `git flow` in your local version of
the repo by typing:

```sh
git flow init
```

Use the default values provided; `master` for the current release, `develop` for
the next release. Since the release process entails pulling changes from
`develop` into a release, then merging that into `master`, you should ensure
that `develop` builds successfully on Travis before commencing a release.

After you've enabled `git flow`, you can use the following commands to make a
release, replacing "1.2.3" with the version you're releasing and updating the
`CHANGELOG.md` and `package.json` to match that version.

```sh
git flow release start 1.2.3
vim CHANGELOG.md
vim src/package.json
git add CHANGELOG.md src/package.json
git commit -m "1.2.3"
git flow release publish 1.2.3
git flow release finish 1.2.3
```

After you've completed the `git flow` steps, you'll need to push the changes
from your local `master` and `develop` branches back to the main repository and
push the release tags to finalize the release:

```sh
git push origin master:master
git push origin develop:develop
git push --tags
```

Once you've pushed the tags, the new release will appear in the project's
["Releases" tab in GitHub](https://github.com/azavea/idb-osm-extraction-tool/releases).
There you can edit the tagged release to add release notes.
