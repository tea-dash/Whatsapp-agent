# Contributing to Amy WhatsApp Assistant

Thank you for considering contributing to this project! This document outlines the process for contributing to the Amy WhatsApp Assistant.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list to see if the problem has already been reported. When creating a bug report, include as many details as possible:

- A clear and descriptive title
- Exact steps to reproduce the issue
- Expected behavior vs. observed behavior
- Screenshots if applicable
- Environment details (OS, browser, etc.)
- Any relevant logs or error messages

### Suggesting Enhancements

Enhancement suggestions are welcome! When suggesting an enhancement:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users
- Provide examples of how it would be used

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Run tests if applicable
5. Submit a pull request

#### Pull Request Guidelines

- Update the README.md with details of changes if applicable
- Update the documentation accordingly
- The PR should work for Node.js 18.x or newer
- Follow the existing code style
- Include relevant tests if possible
- Reference any relevant issues in your PR description

## Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file based on `.env.example`
4. Start the development server: `npm run dev`

## Project Structure

- `a1framework/` - Contains the A1Framework core code
- `components/` - UI components
- `lib/` - Utility functions and business logic
- `app/` - Next.js app router components and API routes
- `public/` - Static assets

## Styling Guidelines

- Follow the existing Tailwind CSS patterns
- Maintain accessibility standards
- Use the existing color scheme and UI components

## Testing

- Run tests with `npm test`
- Ensure all existing tests pass
- Add tests for new features when possible

## Documentation

Good documentation is crucial for this project. When adding or modifying features:

- Update relevant README sections
- Add/update JSDoc comments for functions
- Document API endpoints
- Create example usage if applicable

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to Amy WhatsApp Assistant! 