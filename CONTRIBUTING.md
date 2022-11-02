# Contributing to HealthConnect

Thank you for your interest in contributing to HealthConnect! There are many ways to
contribute, and we appreciate all of them. You can jump to the major sections
of this document using the following links:

* [Bug Reports and Feature Requests][issues]
* [Contributing code][contributing-code]
* [Pull Requests][pull requests]

As a reminder, all contributors are expected to follow our
[Code of Conduct](CODE_OF_CONDUCT.md).

## Bug reports and feature requests
[issues]: #bug-reports-and-feature-requests
Both bug reports and feature request, big or small, are welcome.

Before submitting a feature request, please check if an [open issue][existing-feature-request]
already exists. If this is not the case, [submit a feature request][feature-request].
Describe your use case, why you need this feature and why this feature is important for HealthConnect.

Before filing a bug report, please check if an [open issue][existing-bug]
already exists. If this is not the case, [submit a new bug report][bug-report].
If you're not sure if something is a bug or not, feel free to file a bug report anyway.

**If you believe reporting your bug publicly represents a security risk to
HealthConnect users, please visit security policies of this repository**.
We would appreciate waiting for a 6 months grace period before reporting it on
public channels, to allow us adequate time to release the fix.

[bug reports]: https://github.com/hippyaki/HealthConnect/issues/new?template=bug_report.md
[feature requests]: https://github.com/hippyaki/HealthConnect/issues/new?template=feature_request.md

## Contributing code
[contributing-code]: #contributing-code
If you think your work should be integrated in the main HealthConnect repository, take
the following steps:

  1. Fork the HealthConnect git repository (if you haven't done this already).
  1. Create a branch for your contribution.
  1. Make sure your code is in compliance with HealthConnect's [coding conventions].
  1. Make commits. Make sure to follow HealthConnect's [commit conventions].
  1. Push this branch to your fork or pre-dev branch on GitHub.
  1. Open a [pull request][open-a-pull-request]. See [pull requests].
  1. HealthConnect maintainers will set [labels] and provide feedback.
  1. Address this feedback. See [working with git].
  1. Your code is merged in HealthConnect master branch when it passes review.

Be sure to read the [general tips] below.

[open-an-issue]: https://github.com/hippyaki/HealthConnect/issues?q=state:open+type:issue+label:"Type:+bug"
[labels]: https://github.com/hippyaki/HealthConnect/wiki/HealthConnect%27s-labeling-system
[open-a-pull-request]: https://help.github.com/articles/using-pull-requests

### General Tips
[general tips]: #general-tips
From experience, the following recommendations help to get a software
contribution into HealthConnect master faster:

- **Ask around for help!** Either offline or through one of our communication
  channels (see above). The earlier you check your feature design with other
  people, the less likely it is that it is denied during the review process.
- **Verify your concept early!** If you work on your own until the code
  *looks* good enough to show publicly, you might miss some design flaws others
  might have spotted earlier.
- **Keep it simple!** Try to use what is already there and don't change existing
  APIs if not absolutely necessary.
- **Keep it small!** A PR with >1000 lines of changes will very likely make
  even the most active reviewer put your review on their long to-do list.
- **Keep it modular!** Make extensions to a feature or new features for a
  platform optionally to use.
- **Provide tests!** They should be comprehensible and easy to be executed.
  Alternatively comprehensive testing procedures should be provided with your
  pull request.



### Pull Requests
[pull requests]: #pull-requests

GitHub's Pull Request (PR) feature is the primary mechanism used to make
contributions to the HealthConnect codebase. GitHub itself has some great documentation
on [using the Pull Request feature][about-pull-requests].
We use the [fork and pull model][development-models], where contributors push
changes to their personal fork and create pull requests to bring those changes
into the source repository.

* Before opening a new Pull Request, have a look at
  [existing ones][existing-pull-requests]. Maybe someone has already opened one
  about the same thing. If it's the case, you might be able to help with the
  contribution. Just comment on the PR and ask. Include closed PR's in your
  search, as previous work might have been closed for lack of interest.
  Old and stalled [PRs are sometimes archived][archived-pull-requests] with the
  "State: archived" label, maybe one of them is also about the same topic.

* The Pull Request title should reflect what it is about and be in the same form
  as the [commit conventions].

* Each Pull Request form uses a template that is there to help
  maintainers understand your contribution and help them in testing it.
  Please fill each section with as much information as possible.

* We recommend that you leave the *'Allow edits from maintainers'* check box ticked.
  This will allow maintainer finalizing your PR by pushing in your branch.
  In general, this speeds up the PR merge in the main repository.
  Note that this is not an obligation.

* Remember that smaller PRs tend to be merged faster, so keep your changes as
  concise as possible. They should be confined to a single explainable
  change, and be runnable on their own. So don't hesitate to split your PRs
  into smaller ones when possible.

* Maintainers try their best to review every PR as fast as possible, but they
  are also only human and it can happen that they miss a few PRs or might be
  preoccupied with other PRs. If it happens that your PR receives no review for
  a long time, don't hesitate to gently solicit a review by commenting or
  by explicitly mentioning a maintainer that you know is knowledgeable in the
  area of the PR. You can also advertise the PR on the [forum] and ask for a
  review there.

* Try to answer reviews as quickly as possible to speed up the review process
  and avoid stalled PRs.

You can find more information about HealthConnect development procedure on this
[wiki page][development-procedures].

[about-pull-requests]: https://help.github.com/articles/about-pull-requests/
[development-models]: https://help.github.com/articles/creating-a-pull-request-from-a-fork
[existing-pull-requests]: https://github.com/hippyaki/HealthConnect/pulls
[archived-pull-requests]: https://github.com/hippyaki/HealthConnect/pulls?q=is:pr+label:"State:+archived"
[uncrustify]: http://uncrustify.sourceforge.net
[development-procedures]: https://github.com/hippyaki/HealthConnect/wiki/Development-procedures
