# About This Project

I started working on this portfolio during December of 2023. At the time, I was nearing completion of my undergraduate degrees and was starting to think about my career or attending graduate school. This portfolio includes a brief personal summary as well as my CV and some of my favorite personal and academic projects to date. See the webiste [here](https://christianlentz.github.io/)!

## Development Notes

This GitHub pages website is built with Ruby and Jekyll, hosted on Github Pages, and is configured with a main and staging branch.

### Making Changes

When making changes, always ensure that you are working in the staging branch:

- Ensure that `pwd` is C:\ ... \christianlentz.github.io
- Run `git checkout staging`
- Make and commit changes
- Create a new pull request and merge into main when ready

However, the workflow for this project does allow direct commits to main if needed.

### Ruby Gems

Here are a few basics for working with Ruby, Gems and Bundler:

- Ruby is a language designed for simplicity and often used for developing web applications.
- Gems are packages of Ruby code which are shared across various applications. Think of these as being analogous to node modules when working with Node.js.
- The Gemfile lists all of the Gems that your project needs to run, while Gemfile.lock records the exact version of these Gems. Think of these as analogous to package.json and package-lock.json when working with Node.js.
- Bundler is used to manage these Gem dependencies, similar to npm with Node.js.
- In the case that you need to update any gems, make the appropriate changes to the Gemfile and run `bundle update` to regenerate Gemfile.lock.

### Testing & Serving Local Changes

When making changes, you can test them locally if you have Ruby, Jekyll and Bundler installed.

- Run `bundle install` to get a bundled version of your project. This will read your Gemfile, resolve dependencies and install the gems that you need. This will also update Gemfile.lock to reflect the exact versions of installed gems.
- If you are using a version of Ruby less than 3.0, run `bundle add webrick` as this needed for hosting the application locally.
- Run `bundle exec jekyll serve` to start the local instance. `exec` ensures that we use the Gem versions specified in Gemfile.lock, and `jekyll serve` initiates the server. Again, think of `jekyll serve` as analogous to `npm serve`.

That's it, you are now looking at a local instance of this portfolio! When you are satisfied with the changes, you can use git or GitHub desktop to push the changes to staging. From there, create a PR and merge the changes to main. The main branch is configured with automatic jekyll deploys upon any push to main.
