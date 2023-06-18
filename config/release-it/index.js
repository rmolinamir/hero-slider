module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      header: '# Changelog',
      preset: 'conventionalcommits',
      ignoreRecommendedBump: true
    }
  },
  hooks: {
    'before:init': ['pnpm lint:prepublish', 'pnpm test'],
    'after:bump': 'pnpm build',
    'after:release': 'echo Successfully released ${npm.name} v${version} to ${repo.repository}.'
  },
  git: {
    commitMessage: 'chore(${npm.name}): release ${npm.name} v${version}',
    tagName: '${npm.name}-v${version}'
  },
  github: {
    release: true,
    releaseName: 'Release ${npm.name} v${version}'
  }
};
